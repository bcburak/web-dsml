import {
    getModelForClass,
    index,
    modelOptions,
    prop,
  } from '@typegoose/typegoose';
  
  @index({ email: 1 })
  @modelOptions({
    schemaOptions: {
      // Add createdAt and updatedAt fields
      timestamps: true,
    },
  })
  
  // Export the User class to be used as TypeScript type
  export class UserProfile {
    @prop({unique: true})
    userId: string;
  
    @prop({ required: true })
    projectTree: string;
  
    @prop({ required: true})
    designFileName: string;
  
    @prop({ required: true })
    designFileContent: string;
  }
  
  // Create the user model from the User class
  const userProfileModel = getModelForClass(UserProfile);
  export default userProfileModel;
  