import { AxiosPromise } from "axios";
import api from "@/axios";
import { Flight } from "@/types/flight";

interface GetFlightsResponse {
  airlines: {
    [key: string]: string;
  };
  flights: Flight[];
}

export default {
  getFlights: (): AxiosPromise<GetFlightsResponse> => api.get("/results.json"),
};
