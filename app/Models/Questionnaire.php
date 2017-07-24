<?php

namespace Anglo\Models;

/**
 * @Entity @Table(name="questionnaires")
 */
class Questionnaire
{
    /**
     * @Id
     * @Column(type="integer")
     * @GeneratedValue(strategy="IDENTITY")
     * @var [type]
     */
    protected $id;

    /**
     * @ManyToMany(targetEntity="Village", inversedBy="questionnaires", fetch="EAGER")
     * @JoinTable(name="village_questionnaires")
     *
     */
    protected $villages;
    
    /**
     * @OneToMany(targetEntity="CompletedSurvey", mappedBy="questionnaire", fetch="EAGER")
     *
     * @var [type]
     */
    protected $completedSurveys;


    /**
     * @ManyToMany(targetEntity="Question", mappedBy="questionnaires")
     *
     * @var [type]
     */
    protected $questions;
}