import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type BookDocument = Book & Document;

@Schema()
export class Book {
    @Prop()
    uuid: string;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Number, required: true })
    releaseDate: number;

    @Prop({ type: String, required: true })
    authorName: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);

