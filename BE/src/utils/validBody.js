export const validBody = (dataBody, schemaData) => {
    const { error } = schemaData.validate(dataBody, {
        abortEarly: false,
    });

    if (error) {
        const errors = error.details.map((err) => err.message);
        return errors;
    }
    return null;
};