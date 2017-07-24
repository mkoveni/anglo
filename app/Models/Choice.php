<?php

namespace Anglo\Models;

/**
 * @Entity @Table(name="choices")
 **/
class Choice{

    /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY") **/
    protected $id;

    /** @Column(type="string") **/
    protected $choice;

    protected $question_id;

    public function getId()
    {
        return $this->id;
    }

    public function getChoice()
    {
        return $this->choice;
    }

    public function getQuestionId()
    {
        return $this->question_id;
    }

}