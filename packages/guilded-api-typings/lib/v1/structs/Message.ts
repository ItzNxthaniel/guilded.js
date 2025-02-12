export type ChatMessagePayload = {
    /**
     * The ID of the channel
     */
    channelId: string;
    /**
     * The content of the message
     */
    content: string;
    /**
     * The ISO 8601 timestamp that the message was created at.
     */
    createdAt: string;
    /**
     * The ID of the user who created this message (Note: If this event has createdByBotId or createdByWebhookId present, this field will still be populated, but can be ignored. In these cases, the value of this field will always be Ann6LewA)
     */
    createdBy: string;
    /**
     * The ID of the bot who created this message, if it was created by a bot
     */
    createdByBotId?: string;
    /**
     * The ID of the webhook who created this message, if it was created by a webhook
     */
    createdByWebhookId?: string;
    /**
     * The embeds within this message
     */
    embeds?: EmbedPayload[];
    /**
     * The id of the message
     */
    id: string;
    /**
     * If set, this message will only be seen by those mentioned or replied to.
     */
    isPrivate?: boolean;
    /**
     * If set, this message did not notify, mention or reply recipients.
     */
    isSilent?: boolean;
    /**
     * The mentions within this message
     */
    mentions?: MentionsPayload;
    /**
     * The ID of the messages that this is replying to.
     */
    replyMessageIds?: string[];
    /**
     * The id of the server this message belongs to
     */
    serverId?: string;
    /**
     * The type of chat message. "system" messages are generated by Guilded, while "default" messages are user or bot-generated.
     */
    type: "default" | "system";
    /**
     * The ISO 8601 timestamp that the message was updated at, if relevant
     */
    updatedAt?: string;
};

export type EmbedPayload = {
    author?: EmbedAuthor;
    color?: number;
    description?: string;
    fields?: EmbedField[];
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedImage;
    timestamp?: string;
    title?: string;
    url?: string;
};

export type EmbedFooter = {
    icon_url?: string;
    text: string;
};
export type EmbedImage = {
    url: string;
};
export type EmbedAuthor = {
    icon_url?: string;
    name: string;
    url?: string;
};
export type EmbedField = {
    inline?: boolean;
    name: string;
    value: string;
};

export type MentionsPayload = {
    channels?: { id: string }[];
    everyone?: boolean;
    here?: boolean;
    roles?: { id: number }[];
    users?: { id: string }[];
};
