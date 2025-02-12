import { GlobalManager } from "./GlobalManager";

/**
 * A class representing a global role manager. At the moment, we don't cache roles in this structure.
 */
export class GlobalRoleManager extends GlobalManager {
  /**
   * Awards XP to a role.
   * @param serverId The ID of the server.
   * @param roleId The ID of the role.
   * @param amount The amount of XP to award.
   * @returns A Promise that resolves with the total XP awarded to the role.
   */
  giveXP(serverId: string, roleId: number, amount: number): Promise<number> {
    return this.client.rest.router
      .awardRoleXP(serverId, roleId.toString(), amount)
      .then((data) => data.total);
  }

  /**
   * Assigns a role to a member.
   * @param serverId The ID of the server.
   * @param memberId The ID of the member.
   * @param roleId The ID of the role.
   * @returns A Promise that resolves with no value upon successful completion.
   */
  addRoleToMember(
    serverId: string,
    memberId: string,
    roleId: number
  ): Promise<void> {
    return this.client.rest.router
      .assignRoleToMember(serverId, memberId, roleId)
      .then(() => void 0);
  }

  /**
   * Removes a role from a member.
   * @param serverId The ID of the server.
   * @param memberId The ID of the member.
   * @param roleId The ID of the role.
   * @returns A Promise that resolves with no value upon successful completion.
   */
  removeRoleFromMember(
    serverId: string,
    memberId: string,
    roleId: number
  ): Promise<void> {
    return this.client.rest.router
      .removeRoleFromMember(serverId, memberId, roleId)
      .then(() => void 0);
  }
}
