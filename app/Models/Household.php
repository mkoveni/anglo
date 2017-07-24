<?php

namespace Anglo\Models;

/**
 * @Entity @Table(name="households")
 */
class Household{

    /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY")**/
    protected $id;
    
    /**
     * @ManytoOne(targetEntity="CompletedSurvey" , inversedBy="households", fetch="EAGER" )
     *
     * @var [type]
     */
    protected $completedSurvey;

    public function getId()
    {
        return $this->id;
    }

    public function getCompletedSurveyID()
    {
        return $this->completedSurveyId;
    }

}