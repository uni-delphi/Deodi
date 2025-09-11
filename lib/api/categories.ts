const db = {} as any; // Placeholder for the actual database client import

export async function getAllCategorias() {
  return await db.categoria.findMany({
    // where: {
    //   enunciadosId,
    //   responseType,
    //   NOT: {
    //     respondentId,
    //   },
    // },
    // include: {
    //   singleChoice: true,
    //   checkbox: true,
    // },
    orderBy: {
      title: "asc",
    }
  });
}

export async function getResponsesForCSV() {
  const formattedData = await db.categoria.findMany({
    // include: {
    //   respondent: true,
    //   singleChoice: {
    //     include: {
    //       question: true,
    //     },
    //   },
    //   checkbox: {
    //     include: {
    //       question: true,
    //     },
    //   },
    //   enunciados: {
    //     include: {
    //       tecnologia: {
    //         select: {
    //           title: true,
    //         }
    //       },
    //     },
    //   },
    //   question: true,
    // },
    orderBy: {
      id: "desc",
    },
  });

}

export async function getAllMyResponses(userId: string){
  return await db.categoria.findMany({
    // where: {
    //   respondentId: userId,
    // },
    // include: {
    //   singleChoice: {
    //     include: {
    //       question: true,
    //     },
    //   },
    //   checkbox: {
    //     include: {
    //       question: true,
    //     },
    //   },
    //   enunciados: {
    //     include: {
    //       tecnologia: true,
    //     },
    //   },
    //   question: {
    //     include: {
    //       responses: true,
    //     },
    //   },
    // },
    orderBy: {
      id: "desc",
    },
  });
}

export async function createResponse(newResponseData: any) {
  const data: any = {
    respondentId: newResponseData.respondentId,
    questionId: newResponseData.questionId,
    enunciadosId: newResponseData.enunciadosId,
    responseType: newResponseData.responseType,
    answer: newResponseData.answer,
  };

  // Depending on the response type, add additional data for singleChoice or checkbox
  if (newResponseData.responseType === "SINGLE_CHOICE") {
    data.singleChoice = {
      create: {
        choice: newResponseData.singleChoice.choice,
        answer: newResponseData.singleChoice.answer,
        questionId: newResponseData.questionId,
      },
    };
  } else if (newResponseData.responseType === "CHECKBOX") {
    data.checkbox = {
      create: {
        choices: { set: newResponseData.checkbox.choices },
        answer: newResponseData.checkbox.answer,
        questionId: newResponseData.questionId,
      },
    };
  }

  return await db.categoria.create({
    data,
    // Include relations
    include: {
      //singleChoice: true,
      //checkbox: true,
    },
  });
}

// export async function updateSingleChoiceResponse(
//   responseId: number,
//   data: any
// ) {
//   return await db.singleChoiceResponse.update({
//     where: {
//       id: responseId,
//     },
//     data,
//   });
// }

// export async function updateCheckboxResponse(responseId: number, data: any) {
//   return await db.checkboxResponse.update({
//     where: {
//       id: responseId,
//     },
//     data,
//   });
// }
