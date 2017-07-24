<?php

namespace Anglo\Models;
/**
 * @Entity @Table(name="household_members")
 */
class HouseholdMember{

    /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY")**/
    protected $id;
    
    /**
     * @ManyToOne(targetEntity="completedSurvey", inversedBy="householdMembers" )
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