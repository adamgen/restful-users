export declare type SchemaTypeToTypeScript<SchemaType> = SchemaType extends StringConstructor ? string : SchemaType extends NumberConstructor ? number : null;
export declare type fromSchema<TSchema> = {
    [key in (keyof TSchema)]?: SchemaTypeToTypeScript<TSchema[key]>;
};
