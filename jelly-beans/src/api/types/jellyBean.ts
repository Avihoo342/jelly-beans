export interface JellyBean {
    BeanId: number;
    GroupNameSerialized: string;
    FlavorName: string;
    Description: string;
    IngredientsSerialized: string;
    ColorGroup: string;
    BackgroundColor: string | null;
    ImageUrl: string;
    GlutenFree: boolean;
    SugarFree: boolean;
    Seasonal: boolean;
    Kosher: boolean;
}
  
export interface JellyBeanResponse {
    total: number;
    data: JellyBean[];
}

export interface Color {
    colorId: string;
    colorDescription: string;
    hex: (string | null)[];
  }
  
export interface ColorsResponse {
    total: number;
    data: Color[];
}
  
export interface CombinationItem {
    CombinationId: number;
    Name: string;
    TagSerialized: string;
  }
  
export interface Combination {
    total: number;
    data: CombinationItem[];
}