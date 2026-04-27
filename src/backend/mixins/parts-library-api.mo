import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import PartsLib "../lib/parts-library";
import Types "../types/parts-library";

mixin (parts : Map.Map<Text, Types.Part>) {
  /// Returns all parts (sample + all user-saved); public query, no auth required.
  public query func listParts() : async [Types.Part] {
    PartsLib.listAll(parts);
  };

  /// Saves or updates a part owned by the caller. Returns the part id.
  /// Requires authentication (non-anonymous caller).
  public shared ({ caller }) func savePart(input : Types.PartInput) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in to save a part");
    };
    PartsLib.save(parts, input, caller, Time.now());
  };

  /// Deletes caller's own part. Returns true if deleted.
  /// Cannot delete sample parts. Requires authentication.
  public shared ({ caller }) func deletePart(id : Text) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in to delete a part");
    };
    PartsLib.delete(parts, id, caller);
  };
};
