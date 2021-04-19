export class AvatarType {
    name: string = 'Sita';
    avatarStyle: string = 'Circle';
    topType: string = 'Default';
    accessoriesType: string = 'Default';
    hairColor: string = 'Black';
    hatColor: string = "Black"
    facialHairType: string = 'Default';
    facialHairColor: string = 'Black';
    clotheType: string = 'Default';
    clotheColor: string = 'Default';
    eyeType: string = 'Default';
    eyebrowType: string = 'Default';
    mouthType: string = 'Default';
    skinColor: string = 'Default';

    constructor(t: any) {
        if (!t) return;
        this.name = t.name;
        this.avatarStyle = t.avatarStyle;
        this.topType = t.topType;
        this.accessoriesType = t.accessoriesType;
        this.hairColor = t.hairColor;
        this.hatColor = t.hatColor;
        this.facialHairColor = t.facialHairType;
        this.clotheType = t.clotheType;
        this.clotheColor = t.clotheColor;
        this.eyeType = t.eyeType;
        this.eyebrowType = t.eyebrowType;
        this.mouthType = t.mouthType;
        this.skinColor = t.skinColor;
    }

}