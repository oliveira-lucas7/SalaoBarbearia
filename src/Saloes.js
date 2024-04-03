import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useFavoritos } from '../src/Context/FavoritosContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Salao({ titulo, imagem }) {
  const { toggleFavorito, isFavorito } = useFavoritos();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{titulo}</Text>
      <TouchableOpacity onPress={openModal}>
        <View style={styles.containerImagem}>
          <Image source={imagem} style={styles.img} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFavorito(titulo)} style={styles.ContainerButDois}>
        <View style={styles.butBottom}>
          <MaterialCommunityIcons name={isFavorito(titulo) ? "heart" : "heart-outline"} style={styles.butUm} />
        </View>
      </TouchableOpacity>

      {/* Modal de detalhes do salão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{titulo}</Text>
            <Image source={imagem} style={styles.modalImage} />
            {/* Adicione outros detalhes do salão aqui */}
            <TouchableOpacity onPress={closeModal} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: "45%",
    margin: 10,
    display: "flex",
    justifyContent: "center",
    marginTop: 10,
    height: 270,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  img: {
    width: 135,
    top: 10,
    height: 120,
    bottom: 10,
    borderRadius: 5,
  },
  butUm: {
    top: 20,
    fontSize: 38,
  },
  butBottom: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
