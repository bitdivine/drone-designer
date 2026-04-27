import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Types "../types/parts-library";

module {
  public type Part = Types.Part;
  public type PartInput = Types.PartInput;
  public type PartCategory = Types.PartCategory;

  /// Returns all parts (sample + user-saved) as an array.
  public func listAll(parts : Map.Map<Text, Part>) : [Part] {
    parts.values().toArray();
  };

  /// Saves or updates a part owned by the caller. Returns the part id.
  public func save(
    parts : Map.Map<Text, Part>,
    input : PartInput,
    caller : Principal,
    now : Int,
  ) : Text {
    let id = if (input.id == "") {
      // Generate a new ID using timestamp + caller text
      caller.toText() # "-" # now.toText();
    } else {
      // Validate ownership on update
      switch (parts.get(input.id)) {
        case (?existing) {
          if (existing.isSample) {
            // Cannot overwrite a sample — generate new id instead
            caller.toText() # "-" # now.toText();
          } else if (not Principal.equal(existing.owner, caller)) {
            Runtime.trap("Unauthorized: cannot update another user's part");
          } else {
            input.id;
          };
        };
        case null { input.id };
      };
    };

    let createdAt = switch (parts.get(id)) {
      case (?existing) { existing.createdAt };
      case null { now };
    };

    let part : Part = {
      id;
      category = input.category;
      name = input.name;
      specs = input.specs;
      weight = input.weight;
      imageUrl = input.imageUrl;
      createdAt;
      isSample = false;
      owner = caller;
    };

    parts.add(id, part);
    id;
  };

  /// Deletes a caller-owned part. Returns true if deleted, false if not found.
  /// Traps if caller tries to delete a sample part.
  public func delete(
    parts : Map.Map<Text, Part>,
    id : Text,
    caller : Principal,
  ) : Bool {
    switch (parts.get(id)) {
      case null { false };
      case (?existing) {
        if (existing.isSample) {
          Runtime.trap("Cannot delete sample parts");
        };
        if (not Principal.equal(existing.owner, caller)) {
          Runtime.trap("Unauthorized: cannot delete another user's part");
        };
        parts.remove(id);
        true;
      };
    };
  };

  /// Seeds the parts map with sample data if it is empty.
  public func seedSamples(parts : Map.Map<Text, Part>, now : Int) {
    if (not parts.isEmpty()) { return };
    let sampleOwner = Principal.fromText("2vxsx-fae"); // anonymous principal for samples

    let samples : [Part] = [
      {
        id = "sample-frame-1";
        category = #frame;
        name = "Carbon Fiber X-Frame 250mm";
        specs = "{\"material\":\"carbon fiber\",\"size\":\"250mm\",\"type\":\"X-frame\"}";
        weight = 85.0;
        imageUrl = null;
        createdAt = now;
        isSample = true;
        owner = sampleOwner;
      },
      {
        id = "sample-motor-1";
        category = #motor;
        name = "BLHeli 2205 2300KV";
        specs = "{\"kv\":2300,\"stator\":\"2205\",\"maxCurrent\":\"28A\"}";
        weight = 30.0;
        imageUrl = null;
        createdAt = now;
        isSample = true;
        owner = sampleOwner;
      },
      {
        id = "sample-propeller-1";
        category = #propeller;
        name = "HQ Prop 5x4.3x3 Tri-Blade";
        specs = "{\"diameter\":\"5inch\",\"pitch\":\"4.3\",\"blades\":3}";
        weight = 6.0;
        imageUrl = null;
        createdAt = now;
        isSample = true;
        owner = sampleOwner;
      },
      {
        id = "sample-battery-1";
        category = #battery;
        name = "Tattu 1300mAh 4S 75C";
        specs = "{\"capacity\":\"1300mAh\",\"cells\":\"4S\",\"discharge\":\"75C\"}";
        weight = 180.0;
        imageUrl = null;
        createdAt = now;
        isSample = true;
        owner = sampleOwner;
      },
      {
        id = "sample-fc-1";
        category = #flightController;
        name = "Betaflight F7 Stack";
        specs = "{\"processor\":\"STM32F7\",\"gyro\":\"ICM-20689\",\"firmware\":\"Betaflight\"}";
        weight = 9.0;
        imageUrl = null;
        createdAt = now;
        isSample = true;
        owner = sampleOwner;
      },
      {
        id = "sample-camera-1";
        category = #camera;
        name = "Runcam Swift 2";
        specs = "{\"sensor\":\"1/3 CCD\",\"fov\":\"150°\",\"resolution\":\"600TVL\"}";
        weight = 25.0;
        imageUrl = ?"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg";
        createdAt = now;
        isSample = true;
        owner = sampleOwner;
      },
    ];

    for (part in samples.values()) {
      parts.add(part.id, part);
    };
  };
};
