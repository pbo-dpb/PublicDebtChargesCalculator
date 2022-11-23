export const localizedStrings = {
    description: {
        "en": "The PBO developed a tool allowing political parties to estimate the interest charges from their new proposals. For example, if a party wants to implement a measure and its cost is financed by the public debt, then public debt charges will be added to the cost of said measure. Similarly, if a party wants to implement a measure with a net expected revenue, then the revenue would reduce the public debt and would therefore reduce the public debt charges.\n\nTo use the tool, the user must only enter in the appropriate boxes the expected revenue and spending associated with the measure(s) for which they want to estimate the cost in interest. Interest rates projected by the PBO are then applied to the difference between the revenue and the spending. As a result, the user will be able to see the cumulative surplus/deficit including public debt charges associated with one or more measures. The results are displayed over a 5-year horizon.",
        "fr": "Le DPB a développé un outil permettant aux partis politiques d’estimer les frais en intérêts de leurs nouvelles propositions. Par exemple, si une mesure est proposée et son coût est financé par la dette publique, alors des frais d’intérêt s’ajouteront au coût total de ladite mesure. De même, si une mesure est proposée et permet d’engranger de nouveaux revenus, alors ceux-ci permettront de réduire la dette publique et ainsi de réduire les frais d’intérêt payés sur celle-ci.\n\nAfin d’utiliser l’outil, l’usager n’a qu’à entrer dans les cases indiquées le revenu et les dépenses provenant des mesures dont il/elle désire estimer les frais d’intérêt. Des taux d’intérêt projetés par le DPB sont ensuite appliqués à la différence entre les revenus et les dépenses. L’usager pourra ainsi voir le surplus/déficit cumulatif incluant les frais d’intérêt sur la dette publique provenant d’une ou de plusieurs mesures. Les résultats sont reportés sur un horizon de 5 ans."
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