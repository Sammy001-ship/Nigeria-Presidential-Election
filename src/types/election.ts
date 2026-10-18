export type GeopoliticalZone = 
  | 'North Central'
  | 'North East'
  | 'North West'
  | 'South East'
  | 'South South'
  | 'South West'
  | 'Diaspora';

export interface Candidate {
  id: string;
  name: string;
  fullName: string;
  party: string;
  partyFullName: string;
  partyLogo: string;
  partyColor: string;
  secondaryColor: string;
  photoUrl: string;
  age?: number;
  runningMate?: {
    name: string;
    state: string;
    role: string;
  };
  stateOfOrigin?: string;
  zone?: GeopoliticalZone;
  slogan: string;
  bio: string;
  previousOffices: string[];
  manifestoSummary: string;
  manifestoPillars: {
    title: string;
    description: string;
    icon: string;
  }[];
  policyStances: {
    topic: string;
    stance: string;
    details: string;
  }[];
}

export interface NigerianState {
  code: string;
  name: string;
  zone: GeopoliticalZone;
  capital: string;
  registeredVotersEst: number; // in millions
  lgaCount: number;
}

export interface VoteRecord {
  id: string;
  candidateId: string;
  voterName?: string;
  voterAgeGroup: '18-24' | '25-34' | '35-49' | '50+';
  state: string;
  zone: GeopoliticalZone;
  lga?: string;
  vinMock: string;
  votedAt: string;
  primaryReason?: string;
}

export interface StateVoteTally {
  stateName: string;
  zone: GeopoliticalZone;
  totalVotes: number;
  candidateVotes: Record<string, number>; // candidateId -> count
  leadingCandidateId: string;
}

export interface Comment {
  id: string;
  author: string;
  state: string;
  candidateId: string;
  content: string;
  timestamp: string;
  likes: number;
  isVerifiedVoter: boolean;
}

export interface IssuePollOption {
  id: string;
  title: string;
  description: string;
  votes: number;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    weights: Record<string, number>; // candidateId -> weight points
  }[];
}
