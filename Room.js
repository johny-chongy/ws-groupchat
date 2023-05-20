"use strict";

/** Chat rooms that can be joined/left/broadcast to. */

// in-memory storage of roomNames -> room

const rooms = new Map();

/** Room is a collection of listening members; this becomes a "chat room"
 *   where individual users can join/leave/broadcast to.
 */

class Room {
  /** Get room by that name, creating if nonexistent.
   * <p>
   * This uses a programming pattern often called a "registry" ---
   * users of this class only need to .get to find a room; they don't
   * need to know about the `rooms` variable that holds the rooms. To
   * them, the Room class manages all of this stuff for them.
   *
   * @param roomName {string} room to get
   **/

  static get(roomName) {
    if (!rooms.has(roomName)) {
      rooms.set(roomName, new Room(roomName));
    }

    return rooms.get(roomName);
  }

  /** Make a new room, starting with empty set of listeners.
   *
   * @param roomName {string} room name for new room
   * */

  constructor(roomName) {
    this.name = roomName;
    this.members = new Set();
  }

  /** Handle member joining a room.
   *
   * @param member {ChatUser} joining member
   * */

  join(member) {
    this.members.add(member);
  }

  /** Handle member leaving a room.
   *
   * @param member {ChatUser} leaving member
   * */

  leave(member) {
    this.members.delete(member);
  }

    /** Send message only to self.
   *
   * @param member {string to self}
   * */

    selftalk(member, data) {
      console.log("start Room.selftalk")
      member.send(JSON.stringify(data));
    }
     /** get members.
   *
   * @param member {string to self}
   * */

     static getMembers(room) {
      console.log("room=====",room)
      const members = [];
      const memberIterator = room.members.values();
      // console.log("memberIter====", memberIterator.room.members)

      for ( let i=0; i < room.members.size; i++){
        // console.log("memberIterator======", memberIterator.next().value)
        members.push(memberIterator.next().value.name);
      }
      console.log("members====", members)
      return members.join(", ");

    }


  /** Send message to all members in a room.
   *
   * @param data {string} message to send
   * */

  broadcast(data) {
    for (let member of this.members) {
      member.send(JSON.stringify(data));
    }
  }
}

module.exports = Room;
