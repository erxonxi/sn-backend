import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { UserId } from '../../../Shared/Domain/Users/UserId';
import { ProfileId } from '../../Shared/Domain/Profiles/ProfileId';
import { ProfileCount } from './ProfileCount';
import { ProfileName } from './ProfileName';

interface IProfile {
  id: ProfileId;
  userId: UserId;
  name: ProfileName;
  followers: ProfileCount;
  followeds: ProfileCount;
}

export class Profile extends AggregateRoot implements IProfile {
  id: ProfileId;
  userId: UserId;
  name: ProfileName;
  followers: ProfileCount;
  followeds: ProfileCount;

  constructor({ id, userId, name, followeds, followers }: IProfile) {
    super();
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.followeds = followeds;
    this.followers = followers;
  }

  static create({ id, userId, name, followeds, followers }: IProfile): Profile {
    const user = new Profile({ id, userId, name, followeds, followers });
    return user;
  }

  static fromPrimitives(plainData: Primitives<Profile>): Profile {
    return new Profile({
      id: new ProfileId(plainData.id),
      userId: new UserId(plainData.userId),
      name: new ProfileName(plainData.name),
      followeds: new ProfileCount(plainData.followeds),
      followers: new ProfileCount(plainData.followers)
    });
  }

  incrementFollowers() {
    this.followers = new ProfileCount(this.followers.value + 1);
  }

  incrementFolloweds() {
    this.followeds = new ProfileCount(this.followeds.value + 1);
  }

  decrementFollowers() {
    this.followers = new ProfileCount(this.followers.value - 1);
  }

  decrementFolloweds() {
    this.followeds = new ProfileCount(this.followeds.value - 1);
  }

  toPrimitives(): Primitives<Profile> {
    return {
      id: this.id.value,
      userId: this.userId.value,
      name: this.name.value,
      followeds: this.followeds.value,
      followers: this.followers.value
    };
  }
}
