<?php

namespace Anglo\Models;

/**
 * @Entity @Table(name="questions")
 */
class Question{

    /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY")**/
    protected $id;

    /** @Column(type="string")**/
    protected $question;

    protected $parent_id;

    protected $tag_id;

    /**
     * @ManyToOne(targetEntity="Questionnaire", inversedBy="questions", fetch="EAGER")
     * @JoinTable(name="questionnaire_questions")
     **/
    protected $questionnaires;

    public function getId()
    {
        return $this->id;
    }

    public function getQuestion()
    {
        return $this->question;
    }

    public function getParentId()
    {
        return $this->parent_id;
    }

    public function getTag_id()
    {
        return $this->tag_id;
    }

    public function getQuestionTypeId()
    {
        return $this->question_type_id;
    }

    public function getQuestionId()
    {
        return $this->questionnaire_id;
    }
}