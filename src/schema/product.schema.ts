import { object, number, TypeOf, string } from "zod";

export const payload = {
  body: object({
    title: string({
      required_error: "Title required",
    }),
    description: string({
      required_error: "Description required",
    }).min(120, "Description should be at least 120 characters long"),
    price: number({
      required_error: "Price required",
    }),
    image: string({
      required_error: "Image required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "productId is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
