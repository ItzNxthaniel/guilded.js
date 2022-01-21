import { UserSocialLink } from "@guildedjs/guilded-api-typings";

export const ROUTES = {
    // Channel Endpoints
    channelMessages: (channelId: string) => `/channels/${channelId}/messages` as const,
    channelMessage: (channelId: string, messageId: string) => `/channels/${channelId}/messages/${messageId}`,

    // Member Endpoints
    memberNickname: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}/nickname`,
    memberRoles: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}/roles`,

    // Forum Endpoints
    createForumThread: (channelId: string) => `/channels/${channelId}/forum`,

    // List Endpoints
    createListItem: (channelId: string) => `/channels/${channelId}/list`,

    // Docs Endpoints
    channelDocs: (channelId: string) => `/channels/${channelId}/docs`,
    channelDoc: (channelId: string, docId: number) => `/channels/${channelId}/docs/${docId}`,

    // Reactions Endpoints
    channelReaction: (channelId: string, contentId: string, emoteId: number) => `/channels/${channelId}/content/${contentId}/emotes/${emoteId}`,

    // Team XP Endpoints
    memberXP: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}/xp`,
    roleXP: (serverId: string, userId: string) => `/servers/${serverId}/roles/${userId}/xp`,

    // Social Links Endpoints
    getMemberSocialLinks: (serverId: string, userId: string, type: UserSocialLink) => `/servers/${serverId}/members/${userId}/social-links/${type}`,

    // Group Memberships Endpoints
    groupMember: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}`,

    // Role Memberships Endpoints
    memberRole: (memberId: string, roleId: number) => `/members/${memberId}/roles/${roleId}`,
};