import Vue  from 'vue';
import { Component, Lifecycle } from 'av-ts'

@Component
export class Hello extends Vue
{
    @Lifecycle mounted(){
        console.log('here')
    }
}