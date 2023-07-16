import { Component, OnInit } from '@angular/core';
declare var webkitSpeechRecognition :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ultron';
  currentDate = new Date();
  recognition =  new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords:any;

  constructor () {}

  ngOnInit(): void {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;

    this.recognition.addEventListener('result', (e:any) => {
      // const transcript = Array.from(e.results[0])
      //   .map((result:any) => result[0])
      //   .map((result:any) => result.transcript)
      //   .join('');
      const transcript = e.results;
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")
    this.recognition.addEventListener('result', (e:any) => {
      // const transcript = Array.from(e.results[0])
      //   .map((result:any) => result[0])
      //   .map((result:any) => result.transcript)
      //   .join('');
      const transcript = e.results;
      this.tempWords = transcript;
      console.log(transcript);
    });
    this.recognition.addEventListener('end', (condition:any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat()
        this.recognition.start();
      }
    });
  }
  stop() {
    this.isStoppedSpeechRecog = true;
    this.wordConcat()
    this.recognition.stop();
    console.log("End speech recognition")
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
    console.log(this.tempWords);
  }

}
