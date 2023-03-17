//  API
export const GET_MY_INFO = "/api/users/me?populate=*";
export const POST_LOGIN = "/api/auth/local";
export const POST_REGISTER = "/api/auth/local/register";

export const GET_USERS = "/api/users";
export const GET_USER = "/api/users/{id}?populate=*";
export const GET_USER_ARTICLES = "/api/articles?filters[author][id][$eq]={id}&populate=*";

export const GET_ARTICLES = "/api/articles?populate=*";
export const GET_ARTICLE = "/api/articles/{id}?populate[author][populate]=*";