<?php

namespace Anglo\Modules;

/**
 * @Entity @Table(name="Responses")
 */
class Response{

    /** @Id @Column(type="integer") @GeneratedValue(strategy="IDENTITY")**/
    protected $id;

    /** @Column(name="string")**/
    protected $type;

    protected $question_id;

    protected $responsible_id;

    protected $responsible_type;

    public function getId()
    {
        return $this->id;
    }

    public function getType()
    {
        return $this->type;
    }

    public function getQuestionId()
    {
        return $this->question_id;
    }

    public function getResponsibleId()
    {
        return $this->responsible_id;
    }

    public function getResponsibleType()
    {
        return $this->responsible_type;
    }
}