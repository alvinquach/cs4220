// CS4220 Spring 2018
// Homework 2
// Alvin Quach, 300793745


// Question 1

/** Keeps track of groups and group members. */
class Groups {

    /** Accepts an array of group objects or if nothing is passed defaults to an empty array. */
    constructor(groups = []) {
        this.groups = groups;
    }

    /** Adds a group. */
    addGroup(group) {
        // Duplicate group names are not handled.
        this.groups.push(group);
    }

    /** Removes a group by the name of the group. */
    removeGroup(groupName) {
        // This will remove all the groups with the same name (if there are duplicate group names).
        this.groups.filter(g => g.name && g.name.toLowerCase() == groupName.toLowerCase())
            .forEach(g => this.groups.splice(this.groups.indexOf(g), 1));
    }

    /** Adds a member to the group. */
    addMember(groupName, memberName) {
        // This will add the memeber to all the groups with the same name.
        this.groups.filter(g => g.name && g.name.toLowerCase() == groupName.toLowerCase())
            .forEach(g => {
                if (g.members == undefined) {
                    g.members = [];
                }
                g.members.push(memberName);
            });
    }

    /** Removes a member from the group. */
    removeMember(groupName, memberName) {
        // This will remove the memeber to all the groups with the same name, if they exist.
        this.groups.filter(g => g.name && g.name.toLowerCase() == groupName.toLowerCase())
            .forEach(g => {
                if (g.members) {
                    // Duplicate members will be removed.
                    g.members.filter(m => m.toLowerCase() == memberName.toLowerCase())
                        .forEach(m => g.members.splice(g.members.indexOf(m), 1));
                }
            });
    }

    /** Prints the groups. */
    get print() {
        for (let group of this.groups) {
            console.log(group.name);
            console.log("Leader:", group.leader);
            console.log(group.members && group.members.join(" | "));
            console.log();
        }
    }

}


// Question 2

/** Takes an object as an argument and prints the person's first and last name. */
const displayName = ({first, last, twitter, company}) => {
    console.log(`${first} ${last}`);
};


// Question 3

/** Takes an object, array of keys to combine and a destination key. It returns an object with the correct keys combined. */
const combineName = (person, keys, dest) => {
    // This will modify the original person object directly.
    const values = [];
    for (let key of keys) {
        if (key in person) {
            values.push(person[key]);
            delete person[key];
        }
    }
    person[dest] = values.join(" ");
    return person;
};


// Question 4

/** Takes an array as an argument and creates an object. */
const createObject = (people = []) => {
    // No sanitation checks...
    const result = {};
    for (let i = 0, len = people.length; i < len; i++) {
        const person = {};
        for (let field of people[i]) {
            person[field.key] = field.value;
        }
        result[i + 1] = person;
    }
    return result;
};