export interface GetUserRequestHeaders {
    "x-user-key": string;
}
export interface GetUserRequestQuery {
}
export interface GetUserRequestParams {
}
export interface GetUserRequestBody {
}
export type GetUserInput = GetUserRequestBody & GetUserRequestHeaders & GetUserRequestQuery & GetUserRequestParams;
export type GetUserRequest = {
    headers: GetUserRequestHeaders;
    query: GetUserRequestQuery;
    params: GetUserRequestParams;
    body: GetUserRequestBody;
};
export declare const parseReq: (input: GetUserInput) => GetUserRequest & {
    path: string;
};
export interface GetUserResponse {
    /**
     * The user object represents someone interacting with the bot within a specific integration. The same person interacting with a bot in slack and messenger will be represented with two different users.
     */
    user: {
        /**
         * Identifier of the [User](#schema_user)
         */
        id: string;
        /**
         * Name of the [User](#schema_user)
         */
        name?: string;
        /**
         * Picture url of the [User](#schema_user)
         */
        pictureUrl?: string;
        /**
         * Custom profile data of the [User](#schema_user) encoded as a string
         */
        profile?: string;
        /**
         * Creation date of the [User](#schema_user) in ISO 8601 format
         */
        createdAt: string;
        /**
         * Updating date of the [User](#schema_user) in ISO 8601 format
         */
        updatedAt: string;
    };
}
