export function calculatePoints(level, timeTaken, multiplier) {
  // Max points that can be earned according to difficulty
  const maxPoints =
    level === "easy"
      ? 500
      : level === "medium"
      ? 1000
      : level === "hard"
      ? 2000
      : 0; // 0 as fallback

  // Time it should take according to difficulty
  const referenceTime =
    level === "easy"
      ? 60 * 5 // 10 minutes for easy
      : level === "medium"
      ? 60 * 10 // 20 minutes for medium
      : level === "hard"
      ? 60 * 20 // 30 minutes for hard
      : 60 * 60; // 60 minutes as fallback

  // calculate the points based on the time taken and the multiplier
  let points = Math.round(
    (maxPoints / ((timeTaken + 1) / (referenceTime + 1))) * multiplier,
  );

  // ensure that the points value is not greater than maxPoints
  if (points > maxPoints) points = maxPoints;

  return points;
}

export function updatePoints(points) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ points }),
    redirect: "follow",
  };

  fetch(`/auth/updatePoints`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log("error", error));
}
