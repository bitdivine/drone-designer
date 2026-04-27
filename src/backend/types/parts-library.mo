import Principal "mo:core/Principal";

module {
  public type PartCategory = {
    #frame;
    #motor;
    #propeller;
    #battery;
    #flightController;
    #camera;
  };

  public type Part = {
    id : Text;
    category : PartCategory;
    name : Text;
    specs : Text; // serialized JSON of type-specific fields
    weight : Float;
    imageUrl : ?Text;
    createdAt : Int;
    isSample : Bool;
    owner : Principal;
  };

  public type PartInput = {
    id : Text; // empty = generate new; non-empty = update existing
    category : PartCategory;
    name : Text;
    specs : Text;
    weight : Float;
    imageUrl : ?Text;
  };
};
