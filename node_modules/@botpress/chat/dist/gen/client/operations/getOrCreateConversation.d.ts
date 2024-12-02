export interface GetOrCreateConversationRequestHeaders {
    "x-user-key": string;
}
export interface GetOrCreateConversationRequestQuery {
}
export interface GetOrCreateConversationRequestParams {
}
export interface GetOrCreateConversationRequestBody {
    /**
     * Identifier of the [Conversation](#schema_conversation)
     */
    id: string;
}
export type GetOrCreateConversationInput = GetOrCreateConversationRequestBody & GetOrCreateConversationRequestHeaders & GetOrCreateConversationRequestQuery & GetOrCreateConversationRequestParams;
export type GetOrCreateConversationRequest = {
    headers: GetOrCreateConversationRequestHeaders;
    query: GetOrCreateConversationRequestQuery;
    params: GetOrCreateConversationRequestParams;
    body: GetOrCreateConversationRequestBody;
};
export declare const parseReq: (input: GetOrCreateConversationInput) => GetOrCreateConversationRequest & {
    path: string;
};
export interface GetOrCreateConversationResponse {
    conversation: {
        /**
         * Identifier of the [Conversation](#schema_conversation)
         */
        id: string;
        /**
         * Creation date of the [Conversation](#schema_conversation) in ISO 8601 format
         */
        createdAt: string;
        /**
         * Updating date of the [Conversation](#schema_conversation) in ISO 8601 format
         */
        updatedAt: string;
    };
}
