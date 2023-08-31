export interface ICategoryDTO {
  name: string;
}

export interface ICategoryProductsDTO {
  id: string;
  name: string;
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    categoryId: string;
    menuId: string;
  }[];
}
