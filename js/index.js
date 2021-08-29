var Name = ''
var operators = ['+', '-', '*', '/']
var question_number = 1
//rjesenje - odgovor na pitanje
var result_index = 0
var Result = 0
var num_of_questions = 15
//ukupan broj bodova
var Score = 0
var joker_half = false
var joker_public = false

//pomocni niz, ukoliko se na istom pitanju iskoristi prvo joker pola pola pa onda i joker publike
var half_joker_array = [true, true, true, true]

// pocetak igrice
function goToGame() {
  let a = document.getElementById('input')
  let b = document.getElementById('game_page')
  let c = document.getElementById('win')
  let d = document.getElementById('quit')
  let e = document.getElementById('game_over')
  a.style.visibility = 'hidden'
  b.style.visibility = 'visible'
  c.style.visibility = 'hidden'
  d.style.visibility = 'hidden'
  e.style.visibility = 'hidden'
  Name = document.getElementById('name').value
  initialize()
}

//ponovna igra - isti user - pomocna funkcija koja inicijalizira
//podatke kakvi su bili na pocetku, kada se ucita prvi put igrica
function initialize() {
  question_number = 1
  result_index = 0
  Result = 0
  num_of_questions = 15
  Score = 0
  joker_half = false
  joker_public = false
  half_joker_array = [true, true, true, true]
  setQuestion(1)
}

//ukoliko je operator dijeljenja izgenerisan - pomocna funkcija
function division(a, operator, b) {
  if (operator === '/') {
    a = Math.floor(Math.random() * 100) * b
  }

  return a
}

//funkcija koja vraca odgovor na pitanje - rjesenje
function setResult(a, b, operator) {
  if (operator === '+') return a + b
  else if (operator === '-') return a - b
  else if (operator === '*') return a * b
  else return a / b
}

//funkcija za postavljanje pitanja
function setQuestion(level) {
  //ukoliko je iskoristen joker 50:50 na pitanju koje je prije pitanja na kojem je iskoristen joker publike
  half_joker_array = [true, true, true, true]
  //visi level, veci brojevi, stepeni broja 10, pa ce se uzeti neki broj odatle,
  //krece od 1 da ne uzima 0 - zbog dijeljenja, a i da ne bi bilo prejednostavno - tipa 15. pitanje 0 operator 0
  let a = Math.floor(
    Math.random() * (Math.pow(10, level + 1) + 1) + Math.pow(10, level)
  )
  let b = Math.floor(
    Math.random() * (Math.pow(10, level + 1) + 1) + Math.pow(10, level)
  )

  //generisanje operatora
  let operator = operators[Math.floor(Math.random() * operators.length)]
  //division vrati a, ako je operator = / onda postavi novi a, da bude djeljiv s b, ukoliko vec nije, inace vrati a
  a = division(a, operator, b)
  let result = setResult(a, b, operator)
  //postavljanje "laznih" rjesenja
  let false_result_1 = Math.abs(
    Math.floor(Math.random() * (result + 100) + result + 2)
  )
  let false_result_2 = Math.abs(Math.floor(Math.random() * result))
  let false_result_3 = Math.abs(
    Math.floor(Math.random() * (false_result_1 + 100) + false_result_1 + 2)
  )

  let answerArray = [result, false_result_1, false_result_2, false_result_3]
  shuffle(answerArray) //izmjesa ih random, na w3schools pronadjena funkcija
  //rjesenje odgovora se postavlja u globalnu varijablu, koja je potrebna za druge pomocne funkcije
  Result = result
  //indeks na kojem se nalazi rjesenje
  result_index = answerArray.indexOf(result)
  //pitanja
  let first_number = document.getElementById('first_number')
  let Operator = document.getElementById('operator')
  let second_number = document.getElementById('second_number')
  //odgovori
  let first = document.getElementById('first')
  let second = document.getElementById('second')
  let third = document.getElementById('third')
  let fourth = document.getElementById('fourth')

  //prikazivanje izgenerisanih elemenata
  first_number.innerHTML = a
  Operator.innerHTML = operator
  second_number.innerHTML = b

  //uzimam ih iz izmjesane liste
  first.innerHTML = answerArray[0]
  second.innerHTML = answerArray[1]
  third.innerHTML = answerArray[2]
  fourth.innerHTML = answerArray[3]

  first.setAttribute('value', answerArray[0])
  second.setAttribute('value', answerArray[1])
  third.setAttribute('value', answerArray[2])
  fourth.setAttribute('value', answerArray[3])
  color_list(setScore(question_number)) //"oboji" trenutno pitanje na kojem se nalazim
  num_of_questions-- //smanji se broj preostalih pitanja
}

// funkcija za mijesanje elemenata - W3schools izvor
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  //sve dok ima elemenata za mijesanje
  while (0 !== currentIndex) {
    //uzimanje jednog elementa
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    //zamjena elemenata
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function gameOver() {
  //bice 3 levela
  let level = (question_number - (question_number % 5)) / 5 //koliko je jos ostalo pitanja - () / jer ih je 5

  //jer je korisnik izgubio igru; bodovi su mu s praga(levela)
  Score = setScore(level * 5)

  //ukoliko korisnik zeli ponovnu igru, da se refreshuje lista bodova
  get_back_color(setScore(question_number))
  let game_over = document.getElementById('game_over')
  let game_page = document.getElementById('game_page')
  //ukoliko korisnik nije unio svoje ime
  if (Name === '') $('.name').text('bezimeni 😃')
  else $('.name').text(Name)
  $('.score').text(Score)
  game_page.style.visibility = 'hidden'
  game_over.style.visibility = 'visible'
}

function win() {
  //vrati se boja pitanja na listi - ukoliko dodje do ponovne igre
  get_back_color(Score)
  let win = document.getElementById('win')
  let game_page = document.getElementById('game_page')
  if (Name === '') $('.name').text('bezimeni 😃')
  else $('.name').text(Name)
  $('.score').text(Score)
  game_page.style.visibility = 'hidden'
  win.style.visibility = 'visible'
}

$('#quit_button').on('click', function () {
  //button za odustajanje
  let quit = document.getElementById('quit')
  let game_page = document.getElementById('game_page')
  if (Name === '') $('.name').text('bezimeni 😃')
  else $('.name').text(Name)
  $('.score').text(Score)
  game_page.style.visibility = 'hidden'
  quit.style.visibility = 'visible'
})

function setScore(n) {
  //postavlja bodove za odredjeno pitanje
  if (n == 0) return 0
  if (n == 1 || n == 2 || n == 3) return n * 100
  else if (n == 4 || n == 5) return (n - 3) * 500
  else if (n == 6 || n == 7) return (n - 5) * 2000
  else if (n == 8 || n == 9) return (n - 7) * 8000
  else if (n == 10 || n == 11) return (n - 9) * 32000
  else if (n == 12 || n == 13) return (n - 11) * 125000
  else return (n - 13) * 500000
}

function isAnswer(id) {
  //kad kliknemo na odgovor da se provjeri je li tacan odgovor
  if (num_of_questions > 0) {
    //jos uvijek postoje odgvovori - nisam dosla do kraja
    //uzima se odgovor na koji je korisnik pritisnuo
    let answer = document.getElementById(id).getAttribute('value')
    if (answer == Result) {
      //ako je kliknuti odgovor tacan
      alert('Tacan odgovor!')
      Score = setScore(question_number) //postavi score na broj bodova pitanja
      get_back_color(Score) //vratiti boju pitanja na listi
      question_number += 1 //naredno pitanje
      half_joker_array = [true, true, true, true]
      //postavlja pitanje na osnovu levela - level odredjuje tezinu pitanja
      setQuestion(Math.ceil(question_number / 5))
    } else {
      gameOver()
    }
  }
  //ukoliko vise nema pitanja
  else {
    Score = setScore(15)
    get_back_color(Score) //vrati boju ukoliko dodje do ponovne igre
    win()
  }
}

$('#first_answer').on('click', function () {
  if (confirm('Jeste li sigurni da je to Vaš konačan odgovor?')) {
    isAnswer('first') //provjera je li odgovor
  }
})

$('#second_answer').on('click', function () {
  if (confirm('Jeste li sigurni da je to Vaš konačan odgovor?')) {
    isAnswer('second')
  }
})

$('#third_answer').on('click', function () {
  if (confirm('Jeste li sigurni da je to Vaš konačan odgovor?')) {
    isAnswer('third')
  }
})

$('#fourth_answer').on('click', function () {
  if (confirm('Jeste li sigurni da je to Vaš konačan odgovor?')) {
    isAnswer('fourth')
  }
})

//joker 50-50
$('#joker_50_50').on('click', function () {
  if (!joker_half) {
    let index_array = [0, 1, 2, 3]
    //izbacivanje indeksa na kojem se nalazi rjesenje
    index_array.splice(result_index, 1)
    shuffle(index_array) //izmijesa preostale
    //izbaci dva, uvijek na razlicitim pozicijama jer je izmijesana lista
    let first_move_out = index_array[0]
    let second_move_out = index_array[1]
    let first_id = findId(first_move_out)
    let second_id = findId(second_move_out)

    deleteAnswer(first_id)
    deleteAnswer(second_id)
    half_joker_array[first_move_out] = false //dvije pozicije koje brisem
    half_joker_array[second_move_out] = false
    joker_half = true
  } else alert('Iskorišten joker pola pola!')
})

//joker publike
$('#joker_public').on('click', function () {
  if (!joker_public) {
    let temp_array //pomocni niz
    let percentage = num_of_questions / 15
    //sto je nizi level postotak je veci i to znaci da ce publika dati tacan odg,
    //a sto je broj preostalih pitanja manji, vece su sanse da ce publika dati pogresan odgovor
    let a,
      	b,
      	c,
      	d = 0
    other = []
    temp_array = ['a', 'b', 'c', 'd']
    if (result_index == 0) {
      //rezultat je a -
      //random broj koji ide od postotak (broj preostalih pitanja / broj svih pitanja)  do 1 (ne ukljucujuci)
      a = Math.random() * (1 - percentage) + percentage
      b = (1 - a) / 2 //polovina onoga sto je ostalo
      c = (1 - a) / 3 //trecina
      d = 1 - a - b - c //ostatak
      other = [b, c, d]
      shuffle(other)
      b = other[0]
      c = other[1]
      d = other[2]

      // ukoliko je vec iskoristen joker 50:50, na istom pitanju pa onda se iskoristi joker publike
      if (joker_half) {
        b = 0
        c = 0
        d = 0
        let letter = twoJokers(temp_array, 'a') // slovo pod kojim ostane element uz rjesenje nakon polovljenja
        if (letter == 'b') b = 1 - a
        else if (letter == 'c') c = 1 - a
        else d = 1 - a
      }
    } 
    else if (result_index == 1) {
      //odgovor je b
      b = Math.random() * (1 - percentage) + percentage
      c = (1 - b) / 2
      d = (1 - b) / 3
      a = 1 - b - c - d
      other = [c, d, a]
      shuffle(other)
      c = other[0]
      d = other[1]
      a = other[2]

      if (joker_half) {
        c = 0
        d = 0
        a = 0
        let letter = twoJokers(temp_array, 'b')
        if (letter == 'c') c = 1 - b
        else if (letter == 'd') d = 1 - b
        else a = 1 - b
      }
    } 
    else if (result_index == 2) {
      c = Math.random() * (1 - percentage) + percentage
      d = (1 - c) / 2
      a = (1 - c) / 3
      b = 1 - c - d - a
      other = [d, a, b]
      shuffle(other)
      d = other[0]
      a = other[1]
      b = other[2]

      if (joker_half) {
        d = 0
        a = 0
        b = 0
        let letter = twoJokers(['a', 'b', 'c', 'd'], 'c')
        if (letter == 'd') d = 1 - c
        else if (letter == 'a') a = 1 - c
        else b = 1 - c
      }
    } 
    else {
      d = Math.random() * (1 - percentage) + percentage
      a = (1 - d) / 2
      b = (1 - d) / 3
      c = 1 - d - a - b
      other = [a, b, c]
      shuffle(other)
      a = other[0]
      b = other[1]
      c = other[2]
      if (joker_half) {
        a = 0
        b = 0
        c = 0
        let letter = twoJokers(temp_array, 'd')
        if (letter == 'a') a = 1 - d
        else if (letter == 'b') b = 1 - d
        else c = 1 - d
      }
    }
    let a_public = document.getElementById('a')
    let b_public = document.getElementById('b')
    let c_public = document.getElementById('c')
    let d_public = document.getElementById('d')

    //koliko iznosi a * ukupna visina div-a(300px)
    let a_vote = a * 300
    let b_vote = b * 300
    let c_vote = c * 300
    let d_vote = d * 300

    //plavi dio div-ova - da bi bili poredani u istoj liniji odozdo prema gore
    let a_blue = document.getElementById('a_blue')
    let b_blue = document.getElementById('b_blue')
    let c_blue = document.getElementById('c_blue')
    let d_blue = document.getElementById('d_blue')

    //visina plavog dijela div-a
    a_blue.style.height = 300 - a_vote + 'px'
    b_blue.style.height = 300 - b_vote + 'px'
    c_blue.style.height = 300 - c_vote + 'px'
    d_blue.style.height = 300 - d_vote + 'px'

    a_public.style.height = a_vote + 'px'
    b_public.style.height = b_vote + 'px'
    c_public.style.height = c_vote + 'px'
    d_public.style.height = d_vote + 'px'

    //prikazivanje modala
    modal.style.display = 'block'
    joker_public = true
  } 
  else alert('Iskorišten joker publike!')
})

//vrati element koji je ostao uz rjesenje nakon iskoristenog jokera 50:50
//proslijedi se u funkciji i slovo na kojem se nalazi trenutno rjesenje
function twoJokers(array, letter) {
  let t_array = []
  for (let i = 0; i < half_joker_array.length; i++) {
    if (half_joker_array[i] == true) {
      t_array.push(array[i])
    }
  }

  let first_letter = t_array[0]
  let second_letter = t_array[1]
  if (first_letter == letter) return second_letter
  return first_letter
}

//sluzi da bi se mogao dobiti id div-a u kojem se postavi vrijednost tog odgovora
function findId(index) {
  if (index == 0) return 'first'
  else if (index == 1) return 'second'
  else if (index == 2) return 'third'
  else return 'fourth'
}

//kada se iskoristi joker 50:50, sluzi za brisanje vrijednosti odgovora koji ce onda biti uklonjeni
function deleteAnswer(id) {
  let element = document.getElementById(id)
  element.innerHTML = ''
}

//zuta traka - za trenutno pitanje (lista bodova)
function color_list(id) {
  let li = document.getElementById(id)
  li.style.background = 'rgb(211, 189, 44)'
  li.style.color = 'rgb(8, 32, 51)'
}

//zavrseno pitanje - vracanje na staro (lista bodova)
function get_back_color(id) {
  let li = document.getElementById(id)
  li.style.background = 'rgb(15, 48, 74)'
  li.style.color = yellow_or_white(id)
}

//u zavisnosti da li je prag ili ne - kada se vraca na staro
function yellow_or_white(id) {
  if (id == '1000000000' || id == '32000' || id == '1000') return 'white'
  return 'rgb(211, 189, 44)'
}

//uzimanje modala
var modal = document.getElementById('myModal')

//uzimanje x - span elementa koji zatvara modal
var span = document.getElementsByClassName('close')[0]

//kada korisnik pritisne x - zatvori se modal
span.onclick = function () {
  modal.style.display = 'none'
}

//ako korisnik pritisne misem negdje izvan modala, automatski se zatvori modal
//w3schools
//ukoliko igrac klikne na modal nista se nece desiti
//kliknuo je negdje drugo van modala, automatski se isti zatvori
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}