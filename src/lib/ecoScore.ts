// src/lib/ecoScore.ts
import { EcoScoreInput } from './types';

/**
 * Simple scoring algorithm (0‑100).
 * We assign weights to each activity type and normalize.
 */
export function calculateEcoScore(input: EcoScoreInput): number {
  const { activities, wasteReports, challenges, points } = input;
  const activityWeight = 0.4;
  const wasteWeight = 0.3;
  const challengeWeight = 0.2;
  const pointsWeight = 0.1;

  const activityScore = activities.reduce((sum, a) => sum + (a.emission || 0), 0);
  const wasteScore = wasteReports.length * 5;
  const challengeScore = challenges.filter((c) => c.joined && c.progress === 100).length * 10;
  const rawScore =
    activityWeight * (100 - Math.min(activityScore, 100)) +
    wasteWeight * Math.min(wasteScore, 100) +
    challengeWeight * Math.min(challengeScore, 100) +
    pointsWeight * Math.min(points, 100);

  return Math.max(0, Math.min(100, Math.round(rawScore)));
}
