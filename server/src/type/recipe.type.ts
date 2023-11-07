export type Recipe = {
    id : string ;
    name : string;
    photoUrl : string ;
    ingredients? : string[];
    cuisine? : string ;
    dietaryRestrictions? : string;
    numberOfServing : number ;
    directions : string ;
    creatorId : string ;

}
