import { Avatar } from './avatar'

export class Teacher {

  private _id: string;
  private _name: string;
  private _surname: string;
  private _username: string;
  private _email: string;
  private _schoolId: number;
  private _avatarId: number;
  private _avatar: Avatar;

  constructor(name?: string, surname?: string, username?: string,
    email?: string, schoolId?: number, avatarId?: number) {
    this._name = name;
    this._surname = surname;
    this._username = username;
    this._email = email;
    this._schoolId = schoolId;
    this._avatarId = avatarId;
  }

  /* tslint:disable */
  static toObject(object: any): Teacher {
    /* tslint:enable */
    let result: Teacher = new Teacher();
    if (object != null) {
      result.id = object.id;
      result.name = object.name;
      result.surname = object.surname;
      result.username = object.username;
      result.email = object.email;
      result.schoolId = object.schoolId;
      result.avatarId = object.avatarId;
    }
    return result;
  }

  /* tslint:disable */
  static toObjectArray(object: any): Array<Teacher> {
    /* tslint:enable */
    let resultArray: Array<Teacher> = new Array<Teacher>();
    if (object != null) {
      for (let i = 0; i < object.length; i++) {
        resultArray.push(Teacher.toObject(object[i]));
      }
    }
    return resultArray;
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get surname(): string {
    return this._surname;
  }

  public set surname(value: string) {
    this._surname = value;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get schoolId(): number {
    return this._schoolId;
  }

  public set schoolId(value: number) {
    this._schoolId = value;
  }

  public get avatarId(): number {
    return this._avatarId;
  }

  public set avatarId(value: number) {
    this._avatarId = value;
  }

	public get avatar(): Avatar {
		return this._avatar;
	}

	public set avatar(value: Avatar) {
		this._avatar = value;
	}

}
