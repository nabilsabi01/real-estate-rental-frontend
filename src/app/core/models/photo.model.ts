import { Property } from "./property.model";

export interface Photo {
    id: number;
    property: Property;
    photoUrl: string;
    uploadedAt: Date;
}