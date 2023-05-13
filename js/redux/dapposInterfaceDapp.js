import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const dapposInterfaceDapp = createSlice({
  name: "dapposInterfaceDapp",
  initialState: {
    loadingDapp: true,
    dapp: {
      id: "",
      dappName: "",
      walletConnected: false,
      frontendStructure: {
        sections: [
          {
            id: uuidv4(),
            backgroundColor: "",
            config: {
              configOpen: true,
              configActive: true,
              selectedBlockConfig: "",
            },
            blocks: [
              {
                id: uuidv4(),
                backgroundColor: "",
                config: {
                  configOpen: true,
                  configActive: true,
                  selectedConfigItem: {},
                },
                items: [
                  {
                    id: uuidv4(),
                    type: "button",
                    name: "Button",
                    font: {
                      fontFamily: "",
                    },
                    buttonLabel: "",
                    buttonBackgroundColor: "",
                    buttonTextColor: "",
                    selectedFunc: {
                      name: "Select Function",
                      stateMutability: "nonpayable",
                      type: "function",
                      price: {
                        isInputValuePrice: false,
                        priceValue: 0,
                        input: {},
                      },
                      inputs: [],
                      outputs: [],
                      contract: { address: "", abi: [{}] },
                    },
                    successMessage: "",
                    errorMessage: "",
                    config: {
                      switchValueOne: false,
                      switchValueTwo: false,
                      configSwitch: false,
                    },
                    dynamicContractDataValues: [
                      {
                        id: uuidv4(),
                        type: "viewFunc",
                        viewFunc: { func: {}, contract: {}, returnValue: "" },
                      },
                    ],
                    icons: [{ url: "" }],
                  },
                ],
              },
            ],
          },
        ],
        font: {
          fontFamily: "Roboto",
          config: { configOpen: true, configActive: true },
        },
        connectButton: { backgroundColor: "", textColor: "" },
      },
      contracts: [],
      images: [],
      config: { windowClick: false },
    },
  },
  reducers: {
    populateDapposInterfaceDapp: (state, action) => {
      return {
        ...state,
        dapp: action.payload,
        loadingDapp: false,
      };
    },
    toggleWalletConnected: (state, action) => {
      return {
        ...state,
        dapp: {
          ...state.dapp,
          walletConnected: action.payload.value,
        },
      };
    },
    changeItemSelectedFuncInputValue: (state, action) => {
      return {
        ...state,
        dapp: {
          ...state.dapp,
          frontendStructure: {
            ...state.dapp.frontendStructure,
            sections: state.dapp.frontendStructure.sections.map((section) => {
              if (section.id === action.payload.sectionId) {
                return {
                  ...section,
                  blocks: section.blocks.map((block) => {
                    if (block.id === action.payload.blockId) {
                      return {
                        ...block,
                        items: block.items.map((item) => {
                          if (item.id === action.payload.itemId) {
                            return {
                              ...item,
                              selectedFunc: {
                                ...item.selectedFunc,
                                inputs: item.selectedFunc.inputs.map(
                                  (input) => {
                                    if (input.id === action.payload.inputId) {
                                      console.log("hello world");
                                      return {
                                        ...input,
                                        value: action.payload.textValue,
                                      };
                                    } else {
                                      return input;
                                    }
                                  }
                                ),
                              },
                            };
                          } else {
                            return item;
                          }
                        }),
                      };
                    } else {
                      return block;
                    }
                  }),
                };
              } else {
                return section;
              }
            }),
          },
        },
      };
    },
    changeItemSelectedFuncPrice: (state, action) => {
      return {
        ...state,
        dapp: {
          ...state.dapp,
          frontendStructure: {
            ...state.dapp.frontendStructure,
            sections: state.dapp.frontendStructure.sections.map((section) => {
              if (section.id === action.payload.sectionId) {
                return {
                  ...section,
                  blocks: section.blocks.map((block) => {
                    if (block.id === action.payload.blockId) {
                      return {
                        ...block,
                        items: block.items.map((item) => {
                          if (item.id === action.payload.itemId) {
                            return {
                              ...item,
                              selectedFunc: {
                                ...item.selectedFunc,
                                price: {
                                  ...item.selectedFunc.price,
                                  priceValue: action.payload.textValue,
                                },
                              },
                            };
                          } else {
                            return item;
                          }
                        }),
                      };
                    } else {
                      return block;
                    }
                  }),
                };
              } else {
                return section;
              }
            }),
          },
        },
      };
    },
    clearItemSelectedFuncInputValues: (state, action) => {
      return {
        ...state,
        dapp: {
          ...state.dapp,
          frontendStructure: {
            ...state.dapp.frontendStructure,
            sections: state.dapp.frontendStructure.sections.map((section) => {
              if (section.id === action.payload.sectionId) {
                return {
                  ...section,
                  blocks: section.blocks.map((block) => {
                    if (block.id === action.payload.blockId) {
                      return {
                        ...block,
                        items: block.items.map((item) => {
                          if (item.id === action.payload.itemId) {
                            return {
                              ...item,
                              selectedFunc: {
                                ...item.selectedFunc,
                                inputs: item.selectedFunc.inputs.map(
                                  (input) => {
                                    return {
                                      ...input,
                                      value: "",
                                    };
                                  }
                                ),
                              },
                            };
                          } else {
                            return item;
                          }
                        }),
                      };
                    } else {
                      return block;
                    }
                  }),
                };
              } else {
                return section;
              }
            }),
          },
        },
      };
    },
    updateDynamicContractDataItems: (state, action) => {
      return {
        ...state,
        dapp: {
          ...state.dapp,
          frontendStructure: {
            ...state.dapp.frontendStructure,
            sections: state.dapp.frontendStructure.sections.map((section) => {
              return {
                ...section,
                blocks: section.blocks.map((block) => {
                  return {
                    ...block,
                    items: block.items.map((item) => {
                      if (item.type === "dynamicContractData") {
                        return {
                          ...item,
                          config: {
                            ...item.config,
                            configSwitch: !item.config.configSwitch,
                          },
                        };
                      } else {
                        return item;
                      }
                    }),
                  };
                }),
              };
            }),
          },
        },
      };
    },
    changeItemDynamicContractDataValueReturnValue: (state, action) => {
      return {
        ...state,
        dapp: {
          ...state.dapp,
          frontendStructure: {
            ...state.dapp.frontendStructure,
            sections: state.dapp.frontendStructure.sections.map((section) => {
              console.log("getting here:??", action.payload.sectionId);
              console.log("sectionId:", section.id);

              if (section.id === action.payload.sectionId) {
                return {
                  ...section,
                  blocks: section.blocks.map((block) => {
                    if (block.id === action.payload.blockId) {
                      return {
                        ...block,
                        items: block.items.map((item) => {
                          if (item.id === action.payload.itemId) {
                            return {
                              ...item,
                              dynamicContractDataValues:
                                item.dynamicContractDataValues.map(
                                  (dynamicContractDataValue) => {
                                    if (
                                      dynamicContractDataValue.id ===
                                      action.payload.dynamicContractDataValueId
                                    ) {
                                      return {
                                        ...dynamicContractDataValue,
                                        textValue: action.payload.textValue,
                                      };
                                    } else {
                                      return dynamicContractDataValue;
                                    }
                                  }
                                ),
                            };
                          } else {
                            return item;
                          }
                        }),
                      };
                    } else {
                      return block;
                    }
                  }),
                };
              } else {
                return section;
              }
            }),
          },
        },
      };
    },
  },
});

export const {
  populateDapposInterfaceDapp,
  toggleWalletConnected,
  changeItemSelectedFuncInputValue,
  changeItemSelectedFuncPrice,
  clearItemSelectedFuncInputValues,
  updateDynamicContractDataItems,
  changeItemDynamicContractDataValueReturnValue,
} = dapposInterfaceDapp.actions;
export default dapposInterfaceDapp.reducer;
