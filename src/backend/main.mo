import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

actor {
  type Category = {
    #letters;
    #numbers;
    #colors;
  };

  type Question = {
    prompt : Text;
    answers : [Text];
    category : Category;
  };

  type Progress = {
    highestScore : Nat;
    roundsPlayed : Nat;
    lastPlayed : Int;
  };

  let questions = Map.fromIter<Nat, Question>(
    [
      (0, {
        prompt = "What does 'A' sound like?";
        answers = ["ah"];
        category = #letters;
      }),
      (1, {
        prompt = "What is the number after 3?";
        answers = ["4", "four"];
        category = #numbers;
      }),
      (2, {
        prompt = "What color do you get when you mix red and blue?";
        answers = ["purple", "blue red"];
        category = #colors;
      }),
    ].values(),
  );

  let progress = Map.empty<Principal, Progress>();

  public shared ({ caller }) func updateProgress(category : Category, score : Nat) : async () {
    let current = progress.get(caller);

    let newProgress = switch (current) {
      case (null) {
        {
          highestScore = score;
          roundsPlayed = 1;
          lastPlayed = Time.now();
        };
      };
      case (?existing) {
        {
          highestScore = if (score > existing.highestScore) {
            score;
          } else {
            existing.highestScore;
          };
          roundsPlayed = existing.roundsPlayed + 1;
          lastPlayed = Time.now();
        };
      };
    };

    progress.add(caller, newProgress);
  };

  public query ({ caller }) func getProgress() : async Progress {
    switch (progress.get(caller)) {
      case (null) { { highestScore = 0; roundsPlayed = 0; lastPlayed = 0 } };
      case (?prog) { prog };
    };
  };

  public query ({ caller }) func getQuestionsByCategory(category : Category) : async [Question] {
    questions.values().toArray().filter(
      func(q) { q.category == category }
    );
  };
};
