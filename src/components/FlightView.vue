<template lang="pug">
.flight
  .flight__left
    .flight__info.flight-info
      .flight-info__company
        img.flight-info__company-img(
          :src="`https://aviata.kz/static/airline-logos/80x80/${modelValue.carrier}.png`"
          :title="modelValue.carrier_name"
        )
      .flight-info__time-start
        .flight-info__time-start--top {{ modelValue.dep_time.slice(0, -5) }}
        .flight-info__time-start--bottom {{ modelValue.dep_time.slice(-5) }}
      .flight-info__graph
        .flight-info-graph__wrapper
          .flight-info-graph__row-1
            .flight-info-graph__from {{ modelValue.origin_code }}
            .flight-info-graph__time {{ modelValue.best_time }}
            .flight-info-graph__to {{ modelValue.dest_code }}
          .flight-info-graph__line
            .flight-info-graph__line-dot
            .flight-info-graph__line-dot(v-for="item in modelValue.segments_between")
            .flight-info-graph__line-dot
          .flight-info-graph__row-2(v-if="modelValue.segments_between.length" ) через: {{ modelValue.segments_between.join(' и ') }}
      .flight-info__time-end
        .flight-info__time-end--top
          | {{ modelValue.arr_time.slice(0, -5) }} &nbsp;&nbsp;
          //span.red +1
        .flight-info__time-end--bottom
          | {{ modelValue.arr_time.slice(-5) }}
      .flight-info__luggage-info {{ modelValue.luggage }}
    .flight__info-desktop
      .flight__info-details Детали перелета
      .flight__info-conditions Условия тарифа
      .flight__info-returnable(v-if="!modelValue.refundable" )
        .flight__info-returnable-ico.flight__info-returnable-ico--false
        | невозвратный
  .flight__right
    .flight__price {{ modelValue.price }} ₸
    button.flight__select-btn(v-wave) Выбрать
    .flight__text Цена за всех пассажиров
    .flight__last-row
      .flight__luggage {{ modelValue.luggage }}
      button.flight__luggage-add(v-if="modelValue.luggage" v-wave) + Добавить багаж
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FlightPreview } from "@/types/flight";

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<FlightPreview>,
    },
  },
});
</script>
