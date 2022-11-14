function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:8000/lontakari/");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['_id']+'</td>';
          trHTML += '<td>'+object['Navn']+'</td>';
          trHTML += '<td>'+object['Aldur']+'</td>';
          trHTML += '<td>'+object['Gøta']+'</td>';
          trHTML += '<td>'+object['Bydur']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['_id']+')">Dagfør</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['_id']+')">Strika</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
loadTable();

function showUserCreateBox() {
  Swal.fire({
    title: 'Upprætta brúkara',
    html:
      '<input id="id" type="hidden">' +
      '<input id="fyritøka" class="swal2-input" placeholder="Fyritøka">' +
      '<input id="navn" class="swal2-input" placeholder="Navn">' +
      '<input id="aldur" class="swal2-input" placeholder="Aldur">' +
      '<input id="gøta" class="swal2-input" placeholder="Gøta">' +
      '<input id="býður" class="swal2-input" placeholder="Býður">' +
      '<input id="post" class="swal2-input" placeholder="Post nummar">'+
      '<input id="land" class="swal2-input" placeholder="Land">' +
      '<input id="kontonummar" class="swal2-input" placeholder="Konto Nummar">' +
      '<input id="løn" class="swal2-input" placeholder="Løn">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate();
    }
  })
}
  
function userCreate() {
  const navn = document.getElementById("navn").value;
  const aldur = document.getElementById("aldur").value;
  const gøta = document.getElementById("gøta").value;
  const býður = document.getElementById("býður").value;
  const post = document.getElementById("post").value;
  const land = document.getElementById("land").value;
  const kontonummar = document.getElementById("kontonummar").value;
  const løn = document.getElementById("løn").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:8000/lontakari/");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "Fyritoka": 'C3IT',
    "Navn": navn,
    "Aldur": aldur,
    "Gøta": gøta,
    "Bydur": býður,
    "PostNummar": post,
    "Land": land,
    "KontoNummar": kontonummar,
    "Løn": løn
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire({
        title: 'Custom animation with Animate.css',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      loadTable();
    }
  };
}

function showUserEditBox(_id) {
  console.log(_id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://127.0.0.1:8000/lontakari/"+_id);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      //const user = objects[];
      console.log(objects)
      console.log(user);
      Swal.fire({
        title: 'Dagfør løntakara',
        html:
          '<input id="id" type="hidden" value='+['_id']+'>' +
          '<input id="Fyritoka" class="swal2-input" placeholder="Fyritoka" value="'+['Fyritoka']+'">' +
          '<input id="Navn" class="swal2-input" placeholder="Navn" value="'+['Navn']+'">' +
          '<input id="Aldur" class="swal2-input" placeholder="Aldur" value="'+['Aldur']+'">' +
          '<input id="Land" class="swal2-input" placeholder="Land" value="'+['Land']+'">',
        focusConfirm: false,
        preConfirm: () => {
          userEdit();
        }
      })
    }
  };
}

function userEdit() {
  const id = document.getElementById("id").value;
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
    
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "https://www.mecallapi.com/api/users/update");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({ 
    "id": id, "fname": fname, "lname": lname, "username": username, "email": email, 
    "avatar": "https://www.mecallapi.com/users/cat.png"
  }));
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const objects = JSON.parse(this.responseText);
      Swal.fire(objects['message']);
      loadTable();
    }
  };
}