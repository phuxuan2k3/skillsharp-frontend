import { testApi as api } from "D:\\Projects\\skillsharp\\skillsharp-frontend\\generator/../src/features/tests/base/test.api";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTags: build.query<GetTagsApiResponse, GetTagsApiArg>({
      query: () => ({ url: `/tags` }),
    }),
    postTags: build.mutation<PostTagsApiResponse, PostTagsApiArg>({
      query: (queryArg) => ({
        url: `/tags`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getTagsByTagId: build.query<
      GetTagsByTagIdApiResponse,
      GetTagsByTagIdApiArg
    >({
      query: (queryArg) => ({ url: `/tags/${queryArg.tagId}` }),
    }),
    putTagsByTagId: build.mutation<
      PutTagsByTagIdApiResponse,
      PutTagsByTagIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tags/${queryArg.tagId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteTagsByTagId: build.mutation<
      DeleteTagsByTagIdApiResponse,
      DeleteTagsByTagIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tags/${queryArg.tagId}`,
        method: "DELETE",
      }),
    }),
    getCurrentAttemptState: build.query<
      GetCurrentAttemptStateApiResponse,
      GetCurrentAttemptStateApiArg
    >({
      query: () => ({ url: `/current-attempt/state` }),
    }),
    postCurrentAttemptNew: build.mutation<
      PostCurrentAttemptNewApiResponse,
      PostCurrentAttemptNewApiArg
    >({
      query: (queryArg) => ({
        url: `/current-attempt/new`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getCurrentAttemptDo: build.query<
      GetCurrentAttemptDoApiResponse,
      GetCurrentAttemptDoApiArg
    >({
      query: () => ({ url: `/current-attempt/do` }),
    }),
    postCurrentAttemptSubmit: build.mutation<
      PostCurrentAttemptSubmitApiResponse,
      PostCurrentAttemptSubmitApiArg
    >({
      query: () => ({ url: `/current-attempt/submit`, method: "POST" }),
    }),
    getTests: build.query<GetTestsApiResponse, GetTestsApiArg>({
      query: (queryArg) => ({
        url: `/tests`,
        params: {
          searchTitle: queryArg.searchTitle,
          minMinutesToAnswer: queryArg.minMinutesToAnswer,
          maxMinutesToAnswer: queryArg.maxMinutesToAnswer,
          difficulty: queryArg.difficulty,
          tags: queryArg.tags,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    postTests: build.mutation<PostTestsApiResponse, PostTestsApiArg>({
      query: (queryArg) => ({
        url: `/tests`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getTestsByTestId: build.query<
      GetTestsByTestIdApiResponse,
      GetTestsByTestIdApiArg
    >({
      query: (queryArg) => ({ url: `/tests/${queryArg.testId}` }),
    }),
    putTestsByTestId: build.mutation<
      PutTestsByTestIdApiResponse,
      PutTestsByTestIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/${queryArg.testId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteTestsByTestId: build.mutation<
      DeleteTestsByTestIdApiResponse,
      DeleteTestsByTestIdApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/${queryArg.testId}`,
        method: "DELETE",
      }),
    }),
    getTestsByTestIdQuestions: build.query<
      GetTestsByTestIdQuestionsApiResponse,
      GetTestsByTestIdQuestionsApiArg
    >({
      query: (queryArg) => ({ url: `/tests/${queryArg.testId}/questions` }),
    }),
    getManagerTests: build.query<
      GetManagerTestsApiResponse,
      GetManagerTestsApiArg
    >({
      query: (queryArg) => ({
        url: `/manager/tests`,
        params: {
          searchTitle: queryArg.searchTitle,
          minMinutesToAnswer: queryArg.minMinutesToAnswer,
          maxMinutesToAnswer: queryArg.maxMinutesToAnswer,
          difficulty: queryArg.difficulty,
          tags: queryArg.tags,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    getTestsByTestIdAttempts: build.query<
      GetTestsByTestIdAttemptsApiResponse,
      GetTestsByTestIdAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/tests/${queryArg.testId}/attempts`,
        params: {
          sortByStartDate: queryArg.sortByStartDate,
          sortByScore: queryArg.sortByScore,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    getAttemptsByAttemptId: build.query<
      GetAttemptsByAttemptIdApiResponse,
      GetAttemptsByAttemptIdApiArg
    >({
      query: (queryArg) => ({ url: `/attempts/${queryArg.attemptId}` }),
    }),
    getAttemptsByAttemptIdAnswers: build.query<
      GetAttemptsByAttemptIdAnswersApiResponse,
      GetAttemptsByAttemptIdAnswersApiArg
    >({
      query: (queryArg) => ({
        url: `/attempts/${queryArg.attemptId}/answers`,
        params: {
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    getCandidateAttempts: build.query<
      GetCandidateAttemptsApiResponse,
      GetCandidateAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/candidate/attempts`,
        params: {
          sortByStartDate: queryArg.sortByStartDate,
          sortByScore: queryArg.sortByScore,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
    getCandidateTestsByTestIdAttempts: build.query<
      GetCandidateTestsByTestIdAttemptsApiResponse,
      GetCandidateTestsByTestIdAttemptsApiArg
    >({
      query: (queryArg) => ({
        url: `/candidate/tests/${queryArg.testId}/attempts`,
        params: {
          sortByStartDate: queryArg.sortByStartDate,
          sortByScore: queryArg.sortByScore,
          page: queryArg.page,
          perPage: queryArg.perPage,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as testApiGen };
export type GetTagsApiResponse = /** status 200 Success */ {
  id: number;
  name: string;
}[];
export type GetTagsApiArg = void;
export type PostTagsApiResponse = unknown;
export type PostTagsApiArg = {
  body: {
    name: string;
  };
};
export type GetTagsByTagIdApiResponse = /** status 200 Success */ {
  id: number;
  name: string;
};
export type GetTagsByTagIdApiArg = {
  tagId?: number | null;
};
export type PutTagsByTagIdApiResponse = unknown;
export type PutTagsByTagIdApiArg = {
  tagId?: number | null;
  body: {
    name: string;
  };
};
export type DeleteTagsByTagIdApiResponse = unknown;
export type DeleteTagsByTagIdApiArg = {
  tagId?: number | null;
};
export type GetCurrentAttemptStateApiResponse = /** status 200 Success */ {
  hasCurrentAttempt: boolean;
  currentAttempt: {
    id: number;
    secondsLeft: number;
    createdAt: string;
    endedAt: string;
    answers: {
      questionId: number;
      chosenOption: number;
    }[];
    test: {
      id: number;
      title: string;
      minutesToAnswer: number;
    };
  } | null;
};
export type GetCurrentAttemptStateApiArg = void;
export type PostCurrentAttemptNewApiResponse = unknown;
export type PostCurrentAttemptNewApiArg = {
  body: {
    testId: number | null;
  };
};
export type GetCurrentAttemptDoApiResponse = /** status 200 Success */ {
  id: number;
  test: {
    id: number;
    managerId: string;
    title: string;
    description: string;
    minutesToAnswer: number;
    difficulty: string;
    createdAt: string;
    updatedAt: string;
  };
  questions: {
    id: number;
    text: string;
    options: {
      id: number;
      text: string;
    }[];
    points: number;
  }[];
};
export type GetCurrentAttemptDoApiArg = void;
export type PostCurrentAttemptSubmitApiResponse = unknown;
export type PostCurrentAttemptSubmitApiArg = void;
export type GetTestsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: number;
    managerId: string;
    title: string;
    difficulty: string;
    minutesToAnswer: number;
    answerCount: number;
    tags: {
      id: number;
      name: string;
    }[];
    createdAt: string;
    updatedAt: string;
  }[];
};
export type GetTestsApiArg = {
  searchTitle?: string;
  minMinutesToAnswer?: number | null;
  maxMinutesToAnswer?: number | null;
  difficulty?: ("easy" | "medium" | "hard")[] | string;
  tags?: string[] | string;
  page?: number;
  perPage?: number | null;
};
export type PostTestsApiResponse = unknown;
export type PostTestsApiArg = {
  body: {
    tagIds: number[];
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    minutesToAnswer: number;
    questions: {
      text: string;
      options: string[];
      points: number;
      correctOption: number;
    }[];
  };
};
export type GetTestsByTestIdApiResponse = /** status 200 Success */ {
  id: number;
  managerId: string;
  title: string;
  description: string;
  difficulty: string;
  minutesToAnswer: number;
  answerCount: number;
  tags: {
    id: number;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
};
export type GetTestsByTestIdApiArg = {
  testId?: number | null;
};
export type PutTestsByTestIdApiResponse = unknown;
export type PutTestsByTestIdApiArg = {
  testId?: number | null;
  body: {
    tagIds?: number[];
    title?: string;
    description?: string;
    difficulty?: "easy" | "medium" | "hard";
    minutesToAnswer?: number;
    questions?: {
      text: string;
      options: string[];
      points: number;
      correctOption: number;
    }[];
  };
};
export type DeleteTestsByTestIdApiResponse = unknown;
export type DeleteTestsByTestIdApiArg = {
  testId?: number | null;
};
export type GetTestsByTestIdQuestionsApiResponse = /** status 200 Success */ {
  id: number;
  text: string;
  options: string[];
  points: number;
  correctOption: number;
}[];
export type GetTestsByTestIdQuestionsApiArg = {
  testId?: number | null;
};
export type GetManagerTestsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: number;
    managerId: string;
    title: string;
    difficulty: string;
    minutesToAnswer: number;
    answerCount: number;
    tags: {
      id: number;
      name: string;
    }[];
    createdAt: string;
    updatedAt: string;
  }[];
};
export type GetManagerTestsApiArg = {
  searchTitle?: string;
  minMinutesToAnswer?: number | null;
  maxMinutesToAnswer?: number | null;
  difficulty?: ("easy" | "medium" | "hard")[] | string;
  tags?: string[] | string;
  page?: number;
  perPage?: number | null;
};
export type GetTestsByTestIdAttemptsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: number;
    test: {
      id: number;
      managerId: string;
      title: string;
      minutesToAnswer: number;
      tags: string[];
    };
    candidateId: string;
    startDate: string;
    secondsSpent: number;
    score: number;
    totalScore: number;
  }[];
};
export type GetTestsByTestIdAttemptsApiArg = {
  testId?: number | null;
  sortByStartDate?: "asc" | "desc";
  sortByScore?: "asc" | "desc";
  page: number;
  perPage?: number;
};
export type GetAttemptsByAttemptIdApiResponse = /** status 200 Success */ {
  id: number;
  test: {
    id: number;
    managerId: string;
    title: string;
    minutesToAnswer: number;
    tags: string[];
  };
  candidateId: string;
  startDate: string;
  secondsSpent: number;
  score: number;
  totalScore: number;
  totalCorrectAnswers: number;
  totalWrongAnswers: number;
  totalQuestions: number;
};
export type GetAttemptsByAttemptIdApiArg = {
  attemptId?: number | null;
};
export type GetAttemptsByAttemptIdAnswersApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
      question: {
        id: number;
        text: string;
        options: string[];
        points: number;
        correctOption: number;
      };
      chosenOption: number | null;
    }[];
  };
export type GetAttemptsByAttemptIdAnswersApiArg = {
  attemptId?: number | null;
  page: number;
  perPage?: number;
};
export type GetCandidateAttemptsApiResponse = /** status 200 Success */ {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: {
    id: number;
    test: {
      id: number;
      managerId: string;
      title: string;
      minutesToAnswer: number;
      tags: string[];
    };
    candidateId: string;
    startDate: string;
    secondsSpent: number;
    score: number;
    totalScore: number;
  }[];
};
export type GetCandidateAttemptsApiArg = {
  sortByStartDate?: "asc" | "desc";
  sortByScore?: "asc" | "desc";
  page: number;
  perPage?: number;
};
export type GetCandidateTestsByTestIdAttemptsApiResponse =
  /** status 200 Success */ {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
      id: number;
      test: {
        id: number;
        managerId: string;
        title: string;
        minutesToAnswer: number;
        tags: string[];
      };
      candidateId: string;
      startDate: string;
      secondsSpent: number;
      score: number;
      totalScore: number;
    }[];
  };
export type GetCandidateTestsByTestIdAttemptsApiArg = {
  testId?: number | null;
  sortByStartDate?: "asc" | "desc";
  sortByScore?: "asc" | "desc";
  page: number;
  perPage?: number;
};
export const {
  useGetTagsQuery,
  useLazyGetTagsQuery,
  usePostTagsMutation,
  useGetTagsByTagIdQuery,
  useLazyGetTagsByTagIdQuery,
  usePutTagsByTagIdMutation,
  useDeleteTagsByTagIdMutation,
  useGetCurrentAttemptStateQuery,
  useLazyGetCurrentAttemptStateQuery,
  usePostCurrentAttemptNewMutation,
  useGetCurrentAttemptDoQuery,
  useLazyGetCurrentAttemptDoQuery,
  usePostCurrentAttemptSubmitMutation,
  useGetTestsQuery,
  useLazyGetTestsQuery,
  usePostTestsMutation,
  useGetTestsByTestIdQuery,
  useLazyGetTestsByTestIdQuery,
  usePutTestsByTestIdMutation,
  useDeleteTestsByTestIdMutation,
  useGetTestsByTestIdQuestionsQuery,
  useLazyGetTestsByTestIdQuestionsQuery,
  useGetManagerTestsQuery,
  useLazyGetManagerTestsQuery,
  useGetTestsByTestIdAttemptsQuery,
  useLazyGetTestsByTestIdAttemptsQuery,
  useGetAttemptsByAttemptIdQuery,
  useLazyGetAttemptsByAttemptIdQuery,
  useGetAttemptsByAttemptIdAnswersQuery,
  useLazyGetAttemptsByAttemptIdAnswersQuery,
  useGetCandidateAttemptsQuery,
  useLazyGetCandidateAttemptsQuery,
  useGetCandidateTestsByTestIdAttemptsQuery,
  useLazyGetCandidateTestsByTestIdAttemptsQuery,
} = injectedRtkApi;
