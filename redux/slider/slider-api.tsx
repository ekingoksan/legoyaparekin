import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSliderResponse } from "./types";
import { getSlider } from "@/actions/web/slider";

import { HYDRATE } from "next-redux-wrapper";
import { Action, PayloadAction } from "@reduxjs/toolkit";

type RootState = any; // normally inferred from state

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

const slider_api = createApi({
  reducerPath: "slider_api",
  tagTypes: ["slider_api"],

  refetchOnMountOrArgChange: true, // Her arguman değiştiğinde tekrardan istek atar ve yeni veri getirir
  // no cache
  keepUnusedDataFor: 0,
  refetchOnFocus: true,
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },

  baseQuery: fetchBaseQuery({
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState)?.main?.userData?.accessToken?.token
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getSlider: builder.query<getSliderResponse, void>({
      queryFn: async (args) => {
        const response = await getSlider();

        return { data: response };
      },
      providesTags: ["slider_api"],
    }),
    

    // createAppointment: builder.mutation<
    //   createAppointmentResponse, // Dönen cevap
    //   createAppointmentProps // çalışacak fonksiyon ve paramtresi
    // >({
    //   queryFn: async (args) => {
    //     console.log(args, "args");
    //     const response = await createAppointment({
    //       doctorId: args.doctorId,
    //       date: args.date,
    //       name: args.name,
    //       lastname: args.lastname,
    //       phone: args.phone,
    //       description: args.description,
    //     });

    //     console.log(response, "response");

    //     return { data: response };
    //   },
    //   invalidatesTags: ["slider_api"],
    // }),
  }),
});

export const { useGetSliderQuery, useLazyGetSliderQuery } = slider_api;

export default slider_api;
