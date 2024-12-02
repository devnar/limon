export interface CreateConversationRequestHeaders {
    "x-user-key": string;
}
export interface CreateConversationRequestQuery {
}
export interface CreateConversationRequestParams {
}
export interface CreateConversationRequestBody {
    /**
     * Identifier of the [Conversation](#schema_conversation)
     */
    id?: string;
}
export type CreateConversationInput = CreateConversationRequestBody & CreateConversationRequestHeaders & CreateConversationRequestQuery & CreateConversationRequestParams;
export type CreateConversationRequest = {
    headers: CreateConversationRequestHeaders;
    query: CreateConversationRequestQuery;
    params: CreateConversationRequestParams;
    body: CreateConversationRequestBody;
};
export declare const parseReq: (input: CreateConversationInput) => CreateConversationRequest & {
    path: string;
};
export interface CreateConversationResponse {
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
