import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";

@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
})

// Export the User class to be used as TypeScript type
export class FlowLayout {
  @prop({ unique: true, required: true })
  flowFileName: string;
  @prop()
  flowFileData: object;
  @prop({ unique: true, required: true })
  userId: string;
}

// Create the user model from the User class
const flowModel = getModelForClass(FlowLayout);
export default flowModel;
