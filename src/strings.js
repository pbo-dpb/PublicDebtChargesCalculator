export const localizedStrings = {
    description: {
        "en": "This tool is designed to provide an estimate of the interest costs resulting from new policy proposals and budgetary measures.\n\nTo use the tool, simply enter the revenue and expense amounts that are expected from the proposal or measure. The PBO's projected interest rates are then applied to the difference between the revenues and expenses. This will show you the cumulative surplus/deficit including the interest costs on public debt from one or more measures. The results are reported over a 5-year horizon.\n\nFor example, if a measure is proposed and its cost is financed by public debt, then interest charges will be added to the total cost of that measure. Similarly, if a measure is proposed and generates new revenues, then these revenues will reduce the public debt and thus reduce the interest costs paid on it.\n\nThe tool has been updated to reflect our latest interest rate projections.",
        "fr": "Cet outil est conçu de manière à fournir une estimation des coûts d'intérêt résultant des nouvelles propositions politiques et des mesures budgétaires.\n\nAfin d'utiliser l'outil, il suffit de saisir les montants des recettes et des dépenses attendues de la proposition ou de la mesure. Les taux d'intérêt projetés par le DPB sont ensuite appliqués à la différence entre les revenus et les dépenses. Vous pourrez ainsi voir le surplus/déficit cumulatif incluant les frais d'intérêt sur la dette publique provenant d'une ou de plusieurs mesures. Les résultats sont reportés sur un horizon de 5 ans.\n\nPar exemple, si une mesure est proposée et son coût est financé par la dette publique, alors des frais d'intérêt s'ajouteront au coût total de ladite mesure. De même, si une mesure est proposée et permet d'engranger de nouveaux revenus, alors ceux-ci permettront de réduire la dette publique et ainsi de réduire les frais d'intérêt payés sur celle-ci.\n\nL'outil a été mis à jour pour refléter nos dernières projections de taux d'intérêt."
    },
    updatedOn: {
        en: "Updated:",
        fr: "Mis à jour :"
    },

    showBackEnd: {
        en: "Show details",
        fr: "Afficher les détails",
    },
    printPage: {
        en: "Print",
        fr: "Imprimer"
    },
    clearUserInput: {
        en: "Clear",
        fr: "Remettre à zéro"
    },
    units: {
        en: {
            millions: "$M",
        },
        fr: {
            millions: "En million de $",
        }
    },

    ouputsTitle: {
        en: "Results",
        fr: "Résultats"
    },



    /**
     * Groups
     */

    groups: {
        en: {
            interestRates: "Interest rates",
            overallNewDebt: "Overall new debt",
            incrementalGovernmentBondsComposition: "Incremental stock of government bonds, composition"

        },
        fr: {
            interestRates: "Taux d'intérêt",
            overallNewDebt: "Nouvelle dette globale",
            incrementalGovernmentBondsComposition: "Composition de l'encours marginal des obligations d'État"
        },
    },

    /**
     * Inputs
     */
    totalRevenuesMeasures: {
        en: "Total revenues measures",
        fr: "Revenu total provenant de nouvelles mesures"
    },


    totalProgramSpendingMeasures: {
        en: "Total program spending measures",
        fr: "Dépense totale provenant de nouvelles mesures"
    },


    /**
     * Outputs
     */


    // Backend outputs

    day90TreasuryBillsRate: {
        en: {
            label: "90-day treasury bills rate",
        },
        fr: {
            label: "Taux des bons du Trésor à 90 jours",
        }
    },

    year10BondRate: {
        en: {
            label: "10-year bond rate",
        },
        fr: {
            label: "Taux des obligations à 10 ans",
        }
    },


    marginalEffectiveInterestRate: {
        en: {
            label: "Effective interest rate",
        },
        fr: {
            label: "Taux d'intérêt effectif",
        }
    },

    debtChargesOnPrimaryBalances: {
        en: {
            label: "Debt charges on primary balances",
        },
        fr: {
            label: "Frais de la dette sur les soldes primaires",
        }
    },

    debtChargesOnExistingDebtStock: {
        en: {
            label: "Debt charges on existing debt stock",
        },
        fr: {
            label: "Charges de la dette sur le stock de la dette existante",
        }
    },

    newBorrowing: {
        en: {
            label: "Incremental new borrowing",
        },
        fr: {
            label: "Nouvel emprunt marginal",
        }
    },

    debtStock: {
        en: {
            label: "Incremental debt stock",
        },
        fr: {
            label: "Encours de la dette marginal",
        }
    },


    mediumTermBondsNewborrowing: {
        en: {
            label: "Medium-term bonds: New borrowing",
        },
        fr: {
            label: "Obligations à moyen terme : Nouveaux emprunts",
        }
    },


    mediumTermBondsCumulativeBorrowing: {
        en: {
            label: "Medium-term bonds: Cumulative borrowing",
        },
        fr: {
            label: "Obligations à moyen terme : Emprunts cumulés",
        }
    },

    longTermBondsNewborrowing: {
        en: {
            label: "Long-term bonds: New borrowing",
        },
        fr: {
            label: "Obligations à long terme : Nouveaux emprunts",
        }
    },

    mediumTermBondsStock: {
        en: {
            label: "Medium-term bonds stock",
        },
        fr: {
            label: "Encours des obligations à moyen terme",
        }
    },


    longTermBondsStock: {
        en: {
            label: "Long-term bonds stock",
        },
        fr: {
            label: "Encours des obligations à long terme",
        }
    },


    year2BondTurnover: {
        en: {
            label: "2-Year bond turnover",
        },
        fr: {
            label: "Rotation des obligations à 2 ans",
        }
    },

    year3BondTurnover: {
        en: {
            label: "3-Year bond turnover",
        },
        fr: {
            label: "Rotation des obligations à 3 ans",
        }
    },

    year5BondTurnover: {
        en: {
            label: "5-Year bond turnover",
        },
        fr: {
            label: "Rotation des obligations à 5 ans",
        }
    },

    totalMediumTermBondTurnover: {
        en: {
            label: "Total medium-term bonds turnover",
        },
        fr: {
            label: "Rotation totale des obligations à moyen terme",
        }
    },

    mediumTermBondRate: {
        en: {
            label: "Medium-term bonds rate (new borrowing)",
        },
        fr: {
            label: "Taux des obligations à moyen terme (nouveaux emprunts)",
        }
    },

    shareOfMediumTermBondsNewlyIssued: {
        en: {
            label: "Share of medium-term bonds newly issued",
        },
        fr: {
            label: "Part des obligations à moyen terme nouvellement émises",
        }
    },

    runningApplicableInterestRateMediumTerm: {
        en: {
            label: "Running Applicable Interest Rate: Medium-Term",
        },
        fr: {
            label: "Taux d'intérêt courant applicable : Moyen terme",
        }
    },

    longTermBondRate: {
        en: {
            label: "Long-term bonds rate",
        },
        fr: {
            label: "Taux des obligations à long terme",
        }
    },

    shareOfLongTermBondsNewlyIssued: {
        en: {
            label: "Share of long-term bonds newly issued",
        },
        fr: {
            label: "Part des obligations à long terme nouvellement émises",
        }
    },

    runningApplicableInterestRateLongTerm: {
        en: {
            label: "Running Applicable Interest Rate: Long-Term",
        },
        fr: {
            label: "Taux d'intérêt courant applicable : Long terme",
        }
    },

    runningApplicableInterestRateAllDebt: {
        en: {
            label: "Running Applicable Interest Rate: All Debt",
        },
        fr: {
            label: "Taux d'intérêt courant applicable : Toute la dette",
        }
    },


    // General Outputs 

    netChangeOnPrimaryBalance: {
        en: {
            label: "Net change on primary balance ",
        },
        fr: {
            label: "Changement net sur le solde primaire",
        }
    },

    annualPublicDebtCharge: {
        en: {
            label: "Public debt charges",
        },
        fr: {
            label: "Service de la dette publique",
        }
    },

    cumulativeSurplus: {
        en: {
            label: "Cumulative surplus/(deficit)",
        },
        fr: {
            label: "Surplus/(déficit) cumulatif",
        }
    },

    surplusOrDeficit: {
        en: {
            label: "Surplus/(deficit) for the year",
            warning: "Includes public debt charges on surplus/(deficit) from previous years resulting from the implemented policies.",
        },
        fr: {
            label: "Surplus/(déficit) pour l'année",
            warning: "Inclut le service de la dette publique sur le surplus/(déficit) des années précédentes résultant des politiques mises en œuvre."
        }
    },

    cumulativePublicDebtCharges: {
        en: {
            label: "Cumulative public debt charges",
        },
        fr: {
            label: "Frais cumulatifs de la dette publique",
        }
    },

    // New
    treasuryBillStock: {
        en: {
            label: "Treasury bills stock",
        },
        fr: {
            label: "Encours des bons du Trésor",
        }
    }


}