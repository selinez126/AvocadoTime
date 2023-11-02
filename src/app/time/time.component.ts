import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';

@Component({
    selector: 'app-time',
    templateUrl: 'time.component.html',
    styleUrls: ['time.component.scss'],
})

export class TimeComponent implements OnInit {
    
    theMin: number = 0;
    theSec: number = 0;
    theRealMin: number = 0;
    cancelled: boolean = false;
    before: boolean = false;
    normal: boolean = true;

    constructor() {}

    ngOnInit() {}

    fiftyNine() {
        this.theSec = 59;
    }

    async oneSecond() {
        return new Promise(resolve => {
            setTimeout(function(){
                resolve("kewl");
            }, 1000);
        })
    }

    setReal() {
        this.theRealMin = this.theMin;
        this.cancelled = false;
    }

    async startTimer(){
        if (this.before === true && this.cancelled === false){
            this.normal = true;
            this.before = false;
        }
        this.cancelled = false;
        if (this.cancelled) {
            return;
        }
        else {
            this.setReal();
            for (let j = 0; j < this.theRealMin; j++) {
                if ((this.theMin === 0 && this.theSec === 0) || this.cancelled) {
                    return;
                }
                if ((this.theRealMin) !== (this.theMin + j)) {
                    this.theSec = 0;
                    return;
                }
                if (this.theSec === 0) {
                    const kewl = await this.oneSecond();
                    this.theMin--;
                    const fn = this.fiftyNine();
                }
                if (this.theSec === 59 && (this.theRealMin) !== (this.theMin + j + 1)){
                    this.theSec = 0;
                    return;
                }
                else if (this.theSec !== 59 && (this.theRealMin !== (this.theMin + j))) {
                    this.theSec = 0;
                    return;
                }
                for (let i = this.theSec; i > 0; i--) {
                    if (this.before !== true && (this.theRealMin !== (this.theMin + j + 1))) {
                        this.theSec = 0;
                        return;
                    }
                    if (this.cancelled) {
                        return;
                    }
                    else if (this.before && (this.theRealMin !== (this.theMin + j))){
                        this.theSec = 0;
                        return;
                    }
                    const wait = await this.oneSecond();
                    this.theSec--;
                    if (this.theMin === 0 && this.theSec === 0) {
                        this.done();
                    }
                }
            }
        }
    }

    stopTimer() {
        this.cancelled = true;
        this.before = true;
        this.normal = false;
    }

    endTimer() {
        this.cancelled = true;
        this.theMin = 0;
        this.theSec = 0;
    }

    done() {
        this.playAudio();
    }

    playAudio(){
        let audio = new Audio();
        audio.src = "../../../assets/Timer-ding-sound-effect";
        audio.load();
        audio.play();
    }
}

