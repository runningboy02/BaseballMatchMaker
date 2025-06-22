import { surveyResults, type SurveyResult, type InsertSurveyResult } from "@shared/schema";

export interface IStorage {
  createSurveyResult(result: InsertSurveyResult): Promise<SurveyResult>;
  getSurveyResultByShareId(shareId: string): Promise<SurveyResult | undefined>;
}

export class MemStorage implements IStorage {
  private surveyResults: Map<number, SurveyResult>;
  private shareIdToId: Map<string, number>;
  private currentId: number;

  constructor() {
    this.surveyResults = new Map();
    this.shareIdToId = new Map();
    this.currentId = 1;
  }

  async createSurveyResult(insertResult: InsertSurveyResult): Promise<SurveyResult> {
    const id = this.currentId++;
    const result: SurveyResult = {
      ...insertResult,
      id,
      createdAt: new Date(),
    };
    this.surveyResults.set(id, result);
    this.shareIdToId.set(result.shareId, id);
    return result;
  }

  async getSurveyResultByShareId(shareId: string): Promise<SurveyResult | undefined> {
    const id = this.shareIdToId.get(shareId);
    if (!id) return undefined;
    return this.surveyResults.get(id);
  }
}

export const storage = new MemStorage();
