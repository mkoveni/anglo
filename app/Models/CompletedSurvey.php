<?php

namespace Anglo\Models;

/**
 * @Entity @Table(name="completed_surveys")
 */
class CompletedSurvey{

    /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY")**/
    protected $id;

    /**
     * @ManyToOne(targetEntity="Questionnaire", inversedBy="completedSurveys", fetch="EAGER")
     * @JoinColumn(name="questionnaire_id", referencedColumnName="id")
     *
     * @var [type]
     */
    protected $questionnaire;

    /**
     * @OneToMany(targetEntity="householdMember", mappedBy="completedSurvey" )
     *
     * @var [type]
     */
    protected $householdMembers;

    /**
     * @OneToMany(targetEntity="household", mappedBy="completedSurvey")
     *
     * @var [type]
     */
    protected $household;

    public function id()
    {
        return $this->id;
    }

    public function getQuestionnaireId()
    {
        return $this->questionnaire_id;
    }

}