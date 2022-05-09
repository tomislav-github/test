// user selectors
export const idUserSelector = state => state?.userReducer?.id;
export const firstNameUserSelector = state => state?.userReducer?.first_name;
export const lastNameUserSelector = state => state?.userReducer?.last_name;
export const emailUserSelector = state => state?.userReducer?.email;
export const genderUserSelector = state => state?.userReducer?.gender;
export const descriptionUserSelector = state => state?.userReducer?.description;
export const addModalUserSelector = state => state?.userReducer?.addModal;
export const editModalUserSelector = state => state?.userReducer?.editModal;
export const deleteModalUserSelector = state => state?.userReducer?.deleteModal;

// login selectors
export const userNameLoginSelector = state => state?.loginReducer?.user_name;
export const passwordLoginSelector = state => state?.loginReducer?.password;