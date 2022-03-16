<template lang="pug">
.page
  .page__filters
    .filters__container
      .filters__header
        .filters__title Опции тарифа
        .filters__ico-reset
          IcoReset(@click="filters.reset()")
      .filters__body
        Checkbox(v-model="filters.selected" :value="FILTER_STRAIGHT") Только прямые
        Checkbox(v-model="filters.selected" :value="FILTER_LUGGAGE") Только с багажом
        Checkbox(v-model="filters.selected" :value="FILTER_REFUNDABLE") Только возвратные
    .filters__container
      .filters__header
        .filters__title Авиакомпании
        .filters__ico-reset
          IcoReset(@click="airlinesFilters.reset()")
      .filters__body
        Checkbox(v-model="airlinesFilters.selected" :options="airlinesFilters.keys") Все
        template(v-for="[code, title] in airlinesFilters.entries")
          Checkbox(v-model="airlinesFilters.selected" :value="code") {{ title }}
    a.link(@click="filters.reset(); airlinesFilters.reset(); ") Сбросить все фильтры
  .page__results
    transition-group(mode="out-in" name="fade")
      FlightView(v-for="item in flights.filtered" :modelValue="item" :key="item.id")
</template>

<script lang="ts">
import Checkbox from "@/components/Checkbox.vue";
import IcoReset from "@/components/IcoReset.vue";
import FlightView from "@/components/FlightView.vue";
import api from "@/api";
import { computed, defineComponent, onMounted, reactive } from "vue";
import { Flight, FlightPreview } from "@/types/flight";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default defineComponent({
  components: { FlightView, IcoReset, Checkbox },
  setup() {
    const FILTER_STRAIGHT = "FILTER_STRAIGHT";
    const FILTER_LUGGAGE = "FILTER_LUGGAGE";
    const FILTER_REFUNDABLE = "FILTER_REFUNDABLE";

    const filters = reactive({
      selected: new Set() as Set<string>,
      reset() {
        filters.selected = new Set();
      },
    });

    const airlinesFilters = reactive({
      values: {} as { [key: string]: string },
      selected: new Set<string>(),
      reset() {
        airlinesFilters.selected = new Set();
      },
      entries: computed((): [string, string][] => {
        return Object.entries(airlinesFilters.values);
      }),
      keys: computed((): Set<string> => {
        return new Set(Object.keys(airlinesFilters.values));
      }),
    });

    const flights = reactive({
      values: [] as FlightPreview[],
      addAndFormat(items: Flight[]) {
        flights.values = items.map((flight) => {
          const itineraries = flight?.itineraries[0][0];
          const luggage = Object.values(flight.services)[0]?.alt_text;
          return {
            id: flight.id,
            carrier: itineraries?.carrier,
            carrier_name: itineraries?.carrier_name,
            price: flight?.price,
            origin_code: itineraries?.segments[0].origin_code,
            dest_code:
              itineraries?.segments[itineraries?.segments.length - 1].dest_code,
            refundable: itineraries?.refundable,
            dep_time: itineraries?.segments[0].dep_time,
            arr_time:
              itineraries?.segments[itineraries?.segments.length - 1].arr_time,
            best_time: dayjs.utc(flight.best_time * 1000).format("H ч mm м"),
            segments_between: itineraries?.segments
              .slice(0, -1)
              .map((item) => item.dest),
            luggage: ["0 кг", "0 PC"].includes(luggage) ? null : luggage,
          };
        });
      },
      filtered: computed((): FlightPreview[] => {
        return flights.values.filter((item) => {
          const matchFilterStraight =
            !filters.selected.has(FILTER_STRAIGHT) ||
            item.segments_between.length === 0;
          const matchFilterLuggage =
            !filters.selected.has(FILTER_LUGGAGE) || !!item.luggage;
          const matchFilterRefundable =
            !filters.selected.has(FILTER_REFUNDABLE) || item.refundable;
          const matchFilterAirline =
            airlinesFilters.selected?.size === 0 ||
            airlinesFilters.selected.has(item.carrier);
          return (
            matchFilterStraight &&
            matchFilterLuggage &&
            matchFilterRefundable &&
            matchFilterAirline
          );
        });
      }),
    });

    onMounted(async () => {
      const { airlines: a, flights: f } = (await api.common.getFlights()).data;
      flights.addAndFormat(f);
      airlinesFilters.values = a;
    });

    return {
      FILTER_STRAIGHT,
      FILTER_LUGGAGE,
      FILTER_REFUNDABLE,

      filters,
      airlinesFilters,
      flights,
    };
  },
});
</script>
