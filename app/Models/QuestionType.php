<?php

namespace Anglo\Models;

/**
 * @Entity @Table(name="question_types")
 **/
class QuestionType{

    /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY") **/
    protected $id;

    protected $hasOptions;
    
    /** @Column(type="string")**/
    protected $type;

    public function getId()
    {
        return $this->id;
    }

    public function getHasOptions()
    {
        return $this->hasOptions;
    }

    public function getType()
    {
        return $this->type;
    }
}